export interface drone {
    id: number;
    addresses_id: number;
    localisations_id: number
    stat: string;
    batterie: number;
    capacity: number;
    departure: Date;
    estimated_arrival_time: Date;
    created_at: Date;
    updated_at: Date;
}

export interface bike {
    id: number;
    localisation_id: number;
    brand: string;
    type: string;
    availability: number;
    created_at: Date;
    updated_at: Date;
}

export interface publicScreen {
    id: number;
    localisations_id: number;
    type_of_content: string;
    stat: string;
    last_content_update: Date;
    created_at: Date;
    updated_at: Date;
}

export interface parking {
    id: number;
    localisations_id: number;
    availability: number;
    created_at: Date;
    updated_at: Date;
}

export interface bin {
    id: number;
    localisations_id: number;
    capacity: number;
    opened: number;
    last_collection: Date;
    stat: string;
    created_at: Date;
    updated_at: Date;
}

export interface lamp {
    id: number;
    localisations_id: number;
    stat: string;
    intensity: number;
    battery: number;
    presence: number;
    created_at: Date;
    updated_at: Date;
}

export interface modify {
    id: number;
    users_id: number;
    users_id_2: number;
    comments: string;
    created_at: Date;
    updated_at: Date;
}

export interface localisation {
    id: number;
    latitude: number;
    longitude: number;
    created_at: Date;
    updated_at: Date;
}

export interface level {
    id: number;
    type: string;
    points: number;
    created_at: Date;
    updated_at: Date;
}

export interface having {
    id: number;
    users_id: number;
    connection_id: number;
    created_at: Date;
    updated_at: Date;
}

export interface address {
    id: number;
    number: string;
    name: string;
    created_at: Date;
    updated_at: Date;
}

export interface action {
    id: number;
    users_id: number;
    delivering_drones_id: number | null;
    smart_bins_id: number | null;
    information_screen_id: number | null;
    parking_sensors_id: number | null;
    smart_lamp_id: number | null;
    bike_id: number | null;
    action_type: string;
    created_at: Date;
    updated_at: Date;
}

export interface user {
    id: number;
    username: string;
    photo: string | null;
    name: string;
    surname: string;
    email: string;
    gender: string;
    status: string;
    birthdate: string;
    level_id: number;
    address_id: number;
    created_at: string;
    updated_at: string;
}

export interface objectInterface {
    ObjectType: string;
    relevantAtt: string[];
    display: string[];
    icon: string;
}

//DYNAMICS FUNCTIONS
export type ObjectTypes = {
    drone: drone;
    bike: bike;
    lamp: lamp;
    screen: publicScreen;
    parking: parking;
    bin: bin;
};

export const metadata = {
    drone: Object.keys({
        id: 0,
        addresses_id: 0,
        localisations_id: 0,
        stat: '',
        batterie: 0,
        capacity: 0,
        departure: new Date(),
        estimated_arrival_time: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
    }),
    bike: Object.keys({
        id: 0,
        localisation_id: 0,
        brand: '',
        type: '',
        availability: 0,
        created_at: new Date(),
        updated_at: new Date(),
    }),
    lamp: Object.keys({
        id: 0,
        localisations_id: 0,
        stat: '',
        intensity: 0,
        battery: 0,
        presence: 0,
        created_at: new Date(),
        updated_at: new Date(),
    }),
    screen: Object.keys({
        id: 0,
        localisations_id: 0,
        type_of_content: '',
        stat: '',
        last_content_update: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
    }),
    parking: Object.keys({
        id: 0,
        localisations_id: 0,
        availability: 0,
        created_at: new Date(),
        updated_at: new Date(),
    }),
    bin: Object.keys({
        id: 0,
        localisations_id: 0,
        capacity: 0,
        opened: 0,
        last_collection: new Date(),
        stat: '',
        created_at: new Date(),
        updated_at: new Date(),
    }),
} as { [K in keyof ObjectTypes]: string[] };

export function getDynamicObjectMetadata(type: keyof ObjectTypes): string[] {    
    return metadata[type];
}