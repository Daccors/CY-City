export interface drone {
    id:number;
    addresses_id: number;
    localisations_id: number
    stat: string;
    batterie: number;
    capacity: number;
    departure: Date;
    estimated_arrival_time: Date;
    created_at: Date;
    updated_at:Date;
}

export interface bike {
    id: number;
    localisation_id:number;
    brand:string;
    type:string;
    availability:number;
    created_at:Date;
    updated_at: Date;
}