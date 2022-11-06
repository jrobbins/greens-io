# Introduction

This file gives implementation notes for developers.


# Game architecture

* Server: Python3 running on Google Appengine.
  * Data stored in RAM of a single instance.
* Client: JavaScript, HTML, and CSS
* Protocol: JSON resposnes to regular HTTP requests


# Game protocol

* Add a player:
  * Client posts to /api/v0/player with the desired nick.
  * Server responds with a player_id and secret token.
  * Server spawns the player on the map.
  * Player_id is public, but token is secret, like a cookie.

* Server time stamps
  * Some responses from the server include the server timestamp
  * Client estimates server's time at any moment:
    * serverTime = clientTime + (initServerTime - initClientTime)

* Client game loop
  * Redraws the screen as fast a possible using animation frames
  * Requests data on visible cells once per second
  * Client runs the same simulation to generate predictions
  * TODO: consider asking server for recent orders

* Player input processing
  * Client posts to /api/v0/orders/${player_id} immediately
  * Server processes orders as soon as they are received

* Arena view serialization
  * Server sends a 20x16 subgrid, flattened into a 1D list
  * TODO: for now it sends full 40x40
  * JSON is {player_id: [troop_counts_per_cell]}
  * Each client sees other players' troop counts, but not orders?

# Server simulation

* Arena representation
  * A 40x40 1D array of cells, each with 6 neighbors
  * Each player has their own layer of the map
  * Each cell has {player_id: troop_count, ...}

* Tasks
  * The server runs one complete simualtion timestep per second
  * Work for a timestep is divided into 2 * len(players) tasks
  * Simulation task processing is piggy-backed onto view requests
  * If it has been more than 1 second since the last start:
    * Process all remaining tasks
    * Enqueue new tasks for the new timestep
  * Otherwise:
    * Process two tasks
  * Each task covers 1 / num(players) fraction of the arena
  * Each task is either a calulateFlow or applyFlow task
