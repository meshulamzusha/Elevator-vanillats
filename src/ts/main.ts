import AbstractBuilding from "./AbstractBuilding";
import OfficeBuilding from "./OfficeBuilding";

function initializeBuilding(buildingType: string, floors: number, elevators: number): AbstractBuilding {
    switch(buildingType) {
        
        case 'office':
            return new OfficeBuilding(floors, elevators);
        default:
            throw new Error('Unknown building type');
    }
}

const office = initializeBuilding('office', 10, 3);
office.render();