/**
 * Main entry point for the elevator simulation application.
 * 
 * This module:
 * - Initializes the building simulation based on configuration
 * - Renders the building to the DOM
 * - Serves as the starting point for the entire application
 */

import AbstractBuilding from "./AbstractBuilding";
import OfficeBuilding from "./OfficeBuilding";

/**
 * Initializes and returns a building instance based on the specified type and parameters.
 * 
 * This factory function:
 * - Creates the appropriate building type based on the input parameter
 * - Configures the building with specified number of floors and elevators
 * - Currently supports only 'office' building type
 * 
 * @param buildingType - Type of building to create (currently only 'office' supported)
 * @param floors - Number of floors in the building (ground floor is 0)
 * @param elevators - Number of elevators in the building
 * @returns Configured AbstractBuilding instance
 * @throws Error if an unknown building type is specified
 */
function initializeBuilding(buildingType: string, floors: number, elevators: number): AbstractBuilding {
    switch(buildingType) {
        case 'office':
            return new OfficeBuilding(floors, elevators);
        default:
            throw new Error('Unknown building type');
    }
}

// Initialize and render an office building with:
// - 10 floors (0-10)
// - 3 elevators
const office = initializeBuilding('office', 10, 3);
office.render();