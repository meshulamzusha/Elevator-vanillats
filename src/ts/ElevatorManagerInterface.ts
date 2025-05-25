/**
 * Interface defining the core contract for elevator management systems.
 * * Key architectural roles:
 * 1. Serves as the return type for AbstractBuilding's factory method (createManager)
 * 2. Enables different elevator management strategies to be implemented
 * 
 * All elevator manager implementations must provide these fundamental operations:
 * 
 * 1. Handling elevator calls from floors
 * 2. Selecting appropriate elevators for service
 * 
 */
export default interface IElevatorManager {
    /**
     * Handles a call request from a specific floor.
     * Implementations should:
     * - Process the floor call
     * - Select (using elevatorChoice()) and dispatch an elevator
     * - Update the elevator's and floor's properties or fields as needed
     * @param floor - The floor number requesting elevator service
     */
    handleElevatorCall(floor: number): void;

    /**
     * Determines the optimal elevator to service a floor call.
     * Different implementations may use different selection algorithms
     * (e.g., minimum waiting time, closest elevator, etc.)
     * @param floor - The floor number requesting service
     * @returns Index of the selected elevator in the elevators array
     */
    elevatorChoice(floor: number): number;
}