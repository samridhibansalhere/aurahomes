export const propertyTypes = [
  { value: "apartment", label: "Apartment" },
  { value: "commercial", label: "Commercial Property" },
  { value: "cottage", label: "Cottage" },
  { value: "farm", label: "Farm" },
  { value: "house", label: "House" },
  { value: "industrial", label: "Industrial Property" },
  { value: "land", label: "Land" },
  { value: "office", label: "Office" },
  { value: "villa", label: "Villa" },
  { value: "warehouse", label: "Warehouse" },
];

export const propertyStatuses = [
  { value: "lease", label: "For Lease" },
  { value: "rent", label: "For Rent" },
  { value: "sale", label: "For Sale" },
];

export const cities = [
  { value: "Berlin", label: "Berlin" },
  { value: "Dubai", label: "Dubai" },
  { value: "London", label: "London" },
  { value: "Los Angeles", label: "Los Angeles" },
  { value: "New York", label: "New York" },
  { value: "Paris", label: "Paris" },
  { value: "Shanghai", label: "Shanghai" },
  { value: "Singapore", label: "Singapore" },
  { value: "Sydney", label: "Sydney" },
  { value: "Tokyo", label: "Tokyo" },
  { value: "Toronto", label: "Toronto" },
];

export const parkingTypes = [
  { value: "covered", label: "Covered" },
  { value: "garage", label: "Garage" },
  { value: "open", label: "Open" },
  { value: "street", label: "Street Parking" },
  { value: "valet", label: "Valet Parking" },
];

export const furnishingTypes = [
  { value: "fully_equipped", label: "Fully Equipped" },
  { value: "furnished", label: "Furnished" },
  { value: "semi-furnished", label: "Semi-Furnished" },
  { value: "unfurnished", label: "Unfurnished" },
];

export const facingTypes = [
  { value: "east", label: "East" },
  { value: "multiple", label: "Multiple Facings" },
  { value: "north", label: "North" },
  { value: "north-east", label: "North-East" },
  { value: "north-west", label: "North-West" },
  { value: "south", label: "South" },
  { value: "south-east", label: "South-East" },
  { value: "south-west", label: "South-West" },
  { value: "west", label: "West" },
];

export const subscriptionPlans = [
  {
    name: "Basic",
    price: 0,
    propertiesLimit: 3,
    imagesPerPropertyLimit: 3,
    features: [
      "3 Properties Limit",
      "Free for lifetime",
      "Property Details",
      "Property Listing",
      "Property Search",
    ],
  },
  {
    name: "Standard",
    price: 10,
    propertiesLimit: 10,
    imagesPerPropertyLimit: 5,
    features: [
      "10 Properties Limit",
      "24/7 Email Support",
      "AI Support",
      "Property Details",
      "Property Listing",
      "Property Search",
    ],
  },
  {
    name: "Premium",
    price: 25,
    propertiesLimit: 100,
    imagesPerPropertyLimit: 15,
    features: [
      "100 Properties Limit",
      "24/7 Email Support",
      "24/7 Phone Support",
      "AI Support",
      "Personal Account Manager",
      "Property Details",
      "Property Listing",
      "Property Search",
    ],
  }, 
];
