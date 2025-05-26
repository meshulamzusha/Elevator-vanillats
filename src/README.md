# Elevator-vanillats

Elevator-vanillats is a visual elevator system simulator for a building, written in TypeScript with an HTML/CSS user interface. The simulator demonstrates how to implement and manage elevator logic, including optimal elevator selection, arrival timing, and smooth movement animations.

## Main Features

- **Visual Simulation:** Graphic display of a building, floors, and moving elevators.
- **Call Management:** Each floor can "call" an elevator; the system selects the elevator with the shortest arrival time.
- **Smart Management System:** The algorithm manages waiting times, travel, and elevator selection based on real-time elevator status.
- **Modular and Extensible Code:** Built on classes like `Elevator`, `Floor`, and `MinWaitingTimeElevatorManager`, implementing an elevator management interface and allowing for easy extension with new algorithms.
- **Factory Method Pattern:** The code leverages the Factory Method design pattern for constructing elevator manager instances. The abstract `AbstractBuilding` class defines an abstract method `createManager()`, which must be implemented by subclasses to instantiate the appropriate elevator management strategy. This allows easy extension of the system to support different elevator selection algorithms without modifying existing building logic.
- **Animations and Visual Feedback:** Elevators move with smooth animations, showing arrival and waiting times at each floor.

## Usage

1. **Installation and Running**
   - Download or clone the repository.
   - Open `src/html/index.html` in your browser to view the simulator UI.

2. **Key Files**
   - `src/ts/Elevator.ts` — Implements single elevator logic.
   - `src/ts/MinWaitingTimeElevatorManager.ts` — Manages elevator calls and optimal elevator selection.
   - `src/ts/AbstractBuilding.ts` — Abstract building and rendering logic, including the factory method (`createManager`) for elevator manager instantiation.
   - `src/html/index.html` — Main HTML file for launching the simulator.
   - `src/ts/constants.ts` — Main configuration constants (timings, floor height, media files).
   - `src/css/styles.css` — UI styles.

3. **How to Use**
   - Click the call button on any floor to request an elevator.
   - The system will calculate and dispatch the fastest available elevator.
   - The codebase is easily extensible for different selection algorithms, thanks to the use of the factory method pattern.

## Demo

Simply open `src/html/index.html` in your browser. You will see a building with floors and elevator(s). Click a floor's call button — the elevator will move to that floor and display arrival time.

## Possible Extensions

- Implementation of additional elevator management algorithms.

## Credits

- Developed by [meshulamzusha](https://github.com/meshulamzusha)
- Written in TypeScript, easily extensible and open for learning.

## License

This project is open for use and learning.
