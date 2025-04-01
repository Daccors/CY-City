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

export const metadata2 = {
    drone: [
        { key: 'id', type: 'number', constraint: 'None' },
        { key: 'addresses_id', type: 'number', constraint: 'None'},
        { key: 'localisations_id', type: 'number', constraint: 'None' },
        { key: 'stat', type: 'select', constraint: "on|off|updating" },
        { key: 'batterie', type: 'number', constraint: 'None' },
        { key: 'capacity', type: 'number', constraint: 'None' },
        { key: 'departure', type: 'Date', constraint: 'None' },
        { key: 'estimated_arrival_time', type: 'Date', constraint: 'None' },
        { key: 'created_at', type: 'Date', constraint: 'None' },
        { key: 'updated_at', type: 'Date', constraint: 'None' },
    ],
    bike: [
        { key: 'id', type: 'number', constraint: 'None' },
        { key: 'localisation_id', type: 'number', constraint: 'None' },
        { key: 'brand', type: 'string', constraint: 'None' },
        { key: 'type', type: 'select', constraint: "mountain|BMX|electric|cyclo-cross" },
        { key: 'availability', type: 'string', constraint: 'None' },
        { key: 'created_at', type: 'Date', constraint: 'None' },
        { key: 'updated_at', type: 'Date', constraint: 'None' },
    ],
    lamp: [
        { key: 'id', type: 'number', constraint: 'None' },
        { key: 'localisations_id', type: 'number', constraint: 'None' },
        { key: 'stat', type: 'select', constraint: "on|off|updating" },
        { key: 'intensity', type: 'number', constraint: 'None' },
        { key: 'battery', type: 'number', constraint: 'None' },
        { key: 'presence', type: 'boolean', constraint: 'None' },
        { key: 'created_at', type: 'Date', constraint: 'None' },
        { key: 'updated_at', type: 'Date', constraint: 'None' },
    ],
    screen: [
        { key: 'id', type: 'number', constraint: 'None' },
        { key: 'localisations_id', type: 'number', constraint: 'None' },
        { key: 'type_of_content', type: 'select', constraint: "news|weather|traffic|events|ads" },
        { key: 'stat', type: 'select', constraint: "on|off|updating" },
        { key: 'last_content_update', type: 'Date', constraint: 'None' },
        { key: 'created_at', type: 'Date', constraint: 'None' },
        { key: 'updated_at', type: 'Date', constraint: 'None' },
    ],
    parking: [
        { key: 'id', type: 'number', constraint: 'None' },
        { key: 'localisations_id', type: 'number', constraint: 'None' },
        { key: 'availability', type: 'string', constraint: 'None' },
        { key: 'created_at', type: 'Date', constraint: 'None' },
        { key: 'updated_at', type: 'Date', constraint: 'None' },
    ],
    bin: [
        { key: 'id', type: 'number', constraint: 'None' },
        { key: 'localisations_id', type: 'number', constraint: 'None' },
        { key: 'capacity', type: 'number', constraint: 'None' },
        { key: 'opened', type: 'boolean', constraint: 'None' },
        { key: 'last_collection', type: 'Date', constraint: 'None' },
        { key: 'stat', type: 'select', constraint: "on|off|updating" },
        { key: 'created_at', type: 'Date', constraint: 'None' },
        { key: 'updated_at', type: 'Date', constraint: 'None' },
    ],
};
