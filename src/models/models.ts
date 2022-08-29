export interface IAirport {
  id: number
  name: string
  ident: string
  local_code: string
  region: string
  type: string
  country: string
}

export interface IServerResponse<T> {
  count: number
  next: number
  previous: number
  results: T[]
}

export type AirportType = string
export type AirportCountry = string
export type AirportRegion = string

export interface IFilter {
  type: AirportType
  country: AirportCountry
  region: AirportRegion
}

export interface IDetailAirport {
  continent: string
  coordinates: string
  country: string
  elevation_ft: string
  gps_code: string
  iata_code: string
  ident: string
  local_code: string
  municipality: string
  name: string
  region: string
  type: string
}

export interface IAirportComment {
  id: number
  user: {
    username: string
    email: string
  }
  created: string
  comment: string

}