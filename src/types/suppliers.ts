
export interface SupplierResponse {
  id: string
  name: string
  contact_person: string
  email: string
  phone: string
  address: string
  is_active: boolean
  created_at: string
}

export interface SupplierResponsePayload {
  name: string
  contact_person: string
  email: string
  phone: string
  address: string
  is_active: boolean
}

