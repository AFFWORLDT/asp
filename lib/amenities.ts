import {
  Wifi,
  Car,
  Dumbbell,
  Waves,
  Shield,
  Baby,
  TreePine,
  ShoppingBag,
  Utensils,
  Gamepad2,
  Building,
  Users,
  Zap,
  Wind,
  Droplets,
  Sun,
  Home,
  Camera,
  Phone,
  Clock,
  Heart,
  Star,
  Coffee,
  Bike,
  Bus,
  Plane,
  Hotel,
  GraduationCap,
  Stethoscope,
  ShoppingCart,
  Music,
  Palette,
  Book,
  Trophy,
  Target,
  Flower,
  Leaf,
} from "lucide-react"

export interface AmenityIcon {
  name: string
  icon: any
  category: string
}

export const amenityIcons: AmenityIcon[] = [
  // Connectivity & Technology
  { name: "wifi", icon: Wifi, category: "technology" },
  { name: "internet", icon: Wifi, category: "technology" },
  { name: "high-speed internet", icon: Wifi, category: "technology" },
  { name: "broadband", icon: Wifi, category: "technology" },
  { name: "fiber optic", icon: Wifi, category: "technology" },
  { name: "smart home", icon: Home, category: "technology" },
  { name: "home automation", icon: Home, category: "technology" },
  { name: "security system", icon: Shield, category: "technology" },
  { name: "cctv", icon: Camera, category: "technology" },
  { name: "surveillance", icon: Camera, category: "technology" },
  { name: "intercom", icon: Phone, category: "technology" },
  { name: "video intercom", icon: Phone, category: "technology" },
  { name: "access control", icon: Shield, category: "technology" },
  { name: "keycard access", icon: Shield, category: "technology" },

  // Transportation & Parking
  { name: "parking", icon: Car, category: "transportation" },
  { name: "covered parking", icon: Car, category: "transportation" },
  { name: "underground parking", icon: Car, category: "transportation" },
  { name: "valet parking", icon: Car, category: "transportation" },
  { name: "car wash", icon: Car, category: "transportation" },
  { name: "electric car charging", icon: Zap, category: "transportation" },
  { name: "ev charging", icon: Zap, category: "transportation" },
  { name: "bicycle parking", icon: Bike, category: "transportation" },
  { name: "bike storage", icon: Bike, category: "transportation" },
  { name: "shuttle service", icon: Bus, category: "transportation" },
  { name: "airport shuttle", icon: Plane, category: "transportation" },
  { name: "metro access", icon: Bus, category: "transportation" },
  { name: "public transport", icon: Bus, category: "transportation" },

  // Fitness & Recreation
  { name: "gym", icon: Dumbbell, category: "fitness" },
  { name: "fitness center", icon: Dumbbell, category: "fitness" },
  { name: "fitness centre", icon: Dumbbell, category: "fitness" },
  { name: "gymnasium", icon: Dumbbell, category: "fitness" },
  { name: "weight training", icon: Dumbbell, category: "fitness" },
  { name: "cardio equipment", icon: Dumbbell, category: "fitness" },
  { name: "personal trainer", icon: Dumbbell, category: "fitness" },
  { name: "yoga studio", icon: Heart, category: "fitness" },
  { name: "yoga", icon: Heart, category: "fitness" },
  { name: "pilates", icon: Heart, category: "fitness" },
  { name: "meditation room", icon: Heart, category: "fitness" },
  { name: "wellness center", icon: Heart, category: "fitness" },
  { name: "spa", icon: Heart, category: "fitness" },
  { name: "sauna", icon: Sun, category: "fitness" },
  { name: "steam room", icon: Droplets, category: "fitness" },
  { name: "jacuzzi", icon: Waves, category: "fitness" },
  { name: "hot tub", icon: Waves, category: "fitness" },
  { name: "massage room", icon: Heart, category: "fitness" },
  { name: "sports court", icon: Trophy, category: "fitness" },
  { name: "tennis court", icon: Trophy, category: "fitness" },
  { name: "basketball court", icon: Trophy, category: "fitness" },
  { name: "squash court", icon: Trophy, category: "fitness" },
  { name: "badminton court", icon: Trophy, category: "fitness" },
  { name: "volleyball court", icon: Trophy, category: "fitness" },
  { name: "football field", icon: Trophy, category: "fitness" },
  { name: "soccer field", icon: Trophy, category: "fitness" },
  { name: "cricket pitch", icon: Trophy, category: "fitness" },
  { name: "golf simulator", icon: Target, category: "fitness" },
  { name: "putting green", icon: Target, category: "fitness" },
  { name: "jogging track", icon: Target, category: "fitness" },
  { name: "running track", icon: Target, category: "fitness" },
  { name: "walking trail", icon: Target, category: "fitness" },
  { name: "cycling track", icon: Bike, category: "fitness" },

  // Swimming & Water Features
  { name: "swimming pool", icon: Waves, category: "water" },
  { name: "pool", icon: Waves, category: "water" },
  { name: "infinity pool", icon: Waves, category: "water" },
  { name: "lap pool", icon: Waves, category: "water" },
  { name: "leisure pool", icon: Waves, category: "water" },
  { name: "kids pool", icon: Waves, category: "water" },
  { name: "children's pool", icon: Waves, category: "water" },
  { name: "toddler pool", icon: Waves, category: "water" },
  { name: "wading pool", icon: Waves, category: "water" },
  { name: "olympic pool", icon: Waves, category: "water" },
  { name: "heated pool", icon: Waves, category: "water" },
  { name: "indoor pool", icon: Waves, category: "water" },
  { name: "outdoor pool", icon: Waves, category: "water" },
  { name: "rooftop pool", icon: Waves, category: "water" },
  { name: "pool deck", icon: Waves, category: "water" },
  { name: "poolside bar", icon: Waves, category: "water" },
  { name: "water feature", icon: Droplets, category: "water" },
  { name: "fountain", icon: Droplets, category: "water" },
  { name: "waterfall", icon: Droplets, category: "water" },
  { name: "water slide", icon: Waves, category: "water" },
  { name: "lazy river", icon: Waves, category: "water" },
  { name: "beach access", icon: Waves, category: "water" },
  { name: "private beach", icon: Waves, category: "water" },
  { name: "marina", icon: Waves, category: "water" },
  { name: "yacht club", icon: Waves, category: "water" },
  { name: "boat dock", icon: Waves, category: "water" },

  // Security & Safety
  { name: "security", icon: Shield, category: "security" },
  { name: "24/7 security", icon: Shield, category: "security" },
  { name: "24 hour security", icon: Shield, category: "security" },
  { name: "round the clock security", icon: Shield, category: "security" },
  { name: "gated community", icon: Shield, category: "security" },
  { name: "security guard", icon: Shield, category: "security" },
  { name: "concierge", icon: Users, category: "security" },
  { name: "doorman", icon: Users, category: "security" },
  { name: "reception", icon: Users, category: "security" },
  { name: "front desk", icon: Users, category: "security" },
  { name: "fire safety", icon: Shield, category: "security" },
  { name: "fire alarm", icon: Shield, category: "security" },
  { name: "smoke detector", icon: Shield, category: "security" },
  { name: "sprinkler system", icon: Droplets, category: "security" },
  { name: "emergency exit", icon: Shield, category: "security" },
  { name: "backup generator", icon: Zap, category: "security" },
  { name: "power backup", icon: Zap, category: "security" },

  // Family & Children
  { name: "kids area", icon: Baby, category: "family" },
  { name: "children's area", icon: Baby, category: "family" },
  { name: "children area", icon: Baby, category: "family" },
  { name: "kids play area", icon: Baby, category: "family" },
  { name: "children's play area", icon: Baby, category: "family" },
  { name: "playground", icon: Baby, category: "family" },
  { name: "play area", icon: Baby, category: "family" },
  { name: "nursery", icon: Baby, category: "family" },
  { name: "daycare", icon: Baby, category: "family" },
  { name: "childcare", icon: Baby, category: "family" },
  { name: "babysitting", icon: Baby, category: "family" },
  { name: "family room", icon: Users, category: "family" },
  { name: "family lounge", icon: Users, category: "family" },
  { name: "kids club", icon: Baby, category: "family" },
  { name: "teen room", icon: Gamepad2, category: "family" },
  { name: "game room", icon: Gamepad2, category: "family" },
  { name: "gaming area", icon: Gamepad2, category: "family" },
  { name: "arcade", icon: Gamepad2, category: "family" },
  { name: "toy library", icon: Baby, category: "family" },
  { name: "stroller parking", icon: Baby, category: "family" },

  // Landscaping & Gardens
  { name: "garden", icon: TreePine, category: "landscaping" },
  { name: "landscaped garden", icon: TreePine, category: "landscaping" },
  { name: "botanical garden", icon: Flower, category: "landscaping" },
  { name: "rooftop garden", icon: TreePine, category: "landscaping" },
  { name: "terrace garden", icon: TreePine, category: "landscaping" },
  { name: "green spaces", icon: TreePine, category: "landscaping" },
  { name: "park", icon: TreePine, category: "landscaping" },
  { name: "central park", icon: TreePine, category: "landscaping" },
  { name: "community park", icon: TreePine, category: "landscaping" },
  { name: "picnic area", icon: TreePine, category: "landscaping" },
  { name: "bbq area", icon: Utensils, category: "landscaping" },
  { name: "barbecue area", icon: Utensils, category: "landscaping" },
  { name: "outdoor dining", icon: Utensils, category: "landscaping" },
  { name: "gazebo", icon: TreePine, category: "landscaping" },
  { name: "pergola", icon: TreePine, category: "landscaping" },
  { name: "cabana", icon: TreePine, category: "landscaping" },
  { name: "pavilion", icon: TreePine, category: "landscaping" },
  { name: "outdoor seating", icon: TreePine, category: "landscaping" },
  { name: "seating area", icon: TreePine, category: "landscaping" },
  { name: "meditation garden", icon: Leaf, category: "landscaping" },
  { name: "zen garden", icon: Leaf, category: "landscaping" },
  { name: "herb garden", icon: Leaf, category: "landscaping" },
  { name: "vegetable garden", icon: Leaf, category: "landscaping" },
  { name: "flower garden", icon: Flower, category: "landscaping" },
  { name: "rose garden", icon: Flower, category: "landscaping" },
  { name: "water garden", icon: Droplets, category: "landscaping" },

  // Shopping & Retail
  { name: "shopping", icon: ShoppingBag, category: "retail" },
  { name: "retail", icon: ShoppingBag, category: "retail" },
  { name: "shopping center", icon: ShoppingBag, category: "retail" },
  { name: "shopping mall", icon: ShoppingBag, category: "retail" },
  { name: "convenience store", icon: ShoppingCart, category: "retail" },
  { name: "supermarket", icon: ShoppingCart, category: "retail" },
  { name: "grocery store", icon: ShoppingCart, category: "retail" },
  { name: "mini mart", icon: ShoppingCart, category: "retail" },
  { name: "pharmacy", icon: Stethoscope, category: "retail" },
  { name: "medical center", icon: Stethoscope, category: "retail" },
  { name: "clinic", icon: Stethoscope, category: "retail" },
  { name: "bank", icon: Building, category: "retail" },
  { name: "atm", icon: Building, category: "retail" },
  { name: "salon", icon: Palette, category: "retail" },
  { name: "beauty salon", icon: Palette, category: "retail" },
  { name: "barber shop", icon: Palette, category: "retail" },
  { name: "laundry", icon: Home, category: "retail" },
  { name: "dry cleaning", icon: Home, category: "retail" },

  // Dining & Food
  { name: "restaurant", icon: Utensils, category: "dining" },
  { name: "cafe", icon: Coffee, category: "dining" },
  { name: "coffee shop", icon: Coffee, category: "dining" },
  { name: "food court", icon: Utensils, category: "dining" },
  { name: "dining", icon: Utensils, category: "dining" },
  { name: "fine dining", icon: Utensils, category: "dining" },
  { name: "casual dining", icon: Utensils, category: "dining" },
  { name: "fast food", icon: Utensils, category: "dining" },
  { name: "bakery", icon: Coffee, category: "dining" },
  { name: "deli", icon: Utensils, category: "dining" },
  { name: "juice bar", icon: Coffee, category: "dining" },
  { name: "smoothie bar", icon: Coffee, category: "dining" },
  { name: "ice cream", icon: Coffee, category: "dining" },
  { name: "bar", icon: Coffee, category: "dining" },
  { name: "lounge", icon: Coffee, category: "dining" },
  { name: "rooftop bar", icon: Coffee, category: "dining" },
  { name: "poolside bar", icon: Coffee, category: "dining" },

  // Entertainment & Social
  { name: "clubhouse", icon: Building, category: "entertainment" },
  { name: "community center", icon: Building, category: "entertainment" },
  { name: "social hall", icon: Building, category: "entertainment" },
  { name: "function hall", icon: Building, category: "entertainment" },
  { name: "banquet hall", icon: Building, category: "entertainment" },
  { name: "party hall", icon: Building, category: "entertainment" },
  { name: "event space", icon: Building, category: "entertainment" },
  { name: "meeting room", icon: Building, category: "entertainment" },
  { name: "conference room", icon: Building, category: "entertainment" },
  { name: "business center", icon: Building, category: "entertainment" },
  { name: "library", icon: Book, category: "entertainment" },
  { name: "reading room", icon: Book, category: "entertainment" },
  { name: "study room", icon: Book, category: "entertainment" },
  { name: "cinema", icon: Music, category: "entertainment" },
  { name: "movie theater", icon: Music, category: "entertainment" },
  { name: "theater", icon: Music, category: "entertainment" },
  { name: "auditorium", icon: Music, category: "entertainment" },
  { name: "music room", icon: Music, category: "entertainment" },
  { name: "karaoke", icon: Music, category: "entertainment" },
  { name: "dance studio", icon: Music, category: "entertainment" },
  { name: "art studio", icon: Palette, category: "entertainment" },
  { name: "craft room", icon: Palette, category: "entertainment" },
  { name: "hobby room", icon: Palette, category: "entertainment" },
  { name: "billiards", icon: Gamepad2, category: "entertainment" },
  { name: "pool table", icon: Gamepad2, category: "entertainment" },
  { name: "table tennis", icon: Gamepad2, category: "entertainment" },
  { name: "ping pong", icon: Gamepad2, category: "entertainment" },
  { name: "chess room", icon: Gamepad2, category: "entertainment" },
  { name: "card room", icon: Gamepad2, category: "entertainment" },

  // Education & Learning
  { name: "school", icon: GraduationCap, category: "education" },
  { name: "nursery school", icon: GraduationCap, category: "education" },
  { name: "kindergarten", icon: GraduationCap, category: "education" },
  { name: "preschool", icon: GraduationCap, category: "education" },
  { name: "tuition center", icon: GraduationCap, category: "education" },
  { name: "learning center", icon: GraduationCap, category: "education" },
  { name: "computer lab", icon: GraduationCap, category: "education" },
  { name: "language center", icon: GraduationCap, category: "education" },

  // Services & Utilities
  { name: "concierge service", icon: Users, category: "services" },
  { name: "housekeeping", icon: Home, category: "services" },
  { name: "maintenance", icon: Home, category: "services" },
  { name: "property management", icon: Building, category: "services" },
  { name: "guest services", icon: Hotel, category: "services" },
  { name: "room service", icon: Hotel, category: "services" },
  { name: "valet service", icon: Users, category: "services" },
  { name: "porter service", icon: Users, category: "services" },
  { name: "24/7 service", icon: Clock, category: "services" },
  { name: "air conditioning", icon: Wind, category: "services" },
  { name: "central air", icon: Wind, category: "services" },
  { name: "heating", icon: Sun, category: "services" },
  { name: "central heating", icon: Sun, category: "services" },
  { name: "elevator", icon: Building, category: "services" },
  { name: "lift", icon: Building, category: "services" },
  { name: "escalator", icon: Building, category: "services" },
  { name: "wheelchair access", icon: Users, category: "services" },
  { name: "disabled access", icon: Users, category: "services" },
  { name: "barrier free", icon: Users, category: "services" },

  // Default fallback
  { name: "amenity", icon: Star, category: "general" },
  { name: "facility", icon: Building, category: "general" },
  { name: "feature", icon: Star, category: "general" },
]

export function getAmenityIcon(amenityName: string) {
  const normalizedName = amenityName.toLowerCase().trim()

  // Find exact match first
  let match = amenityIcons.find((amenity) => amenity.name === normalizedName)

  // If no exact match, find partial match
  if (!match) {
    match = amenityIcons.find(
      (amenity) => normalizedName.includes(amenity.name) || amenity.name.includes(normalizedName),
    )
  }

  // Return the icon or default
  return match ? match.icon : Star
}

export function getAmenityCategory(amenityName: string): string {
  const normalizedName = amenityName.toLowerCase().trim()

  // Find exact match first
  let match = amenityIcons.find((amenity) => amenity.name === normalizedName)

  // If no exact match, find partial match
  if (!match) {
    match = amenityIcons.find(
      (amenity) => normalizedName.includes(amenity.name) || amenity.name.includes(normalizedName),
    )
  }

  return match ? match.category : "general"
}

export function categorizeAmenities(amenities: string[]) {
  const categorized: { [key: string]: string[] } = {}

  amenities.forEach((amenity) => {
    const category = getAmenityCategory(amenity)
    if (!categorized[category]) {
      categorized[category] = []
    }
    categorized[category].push(amenity)
  })

  return categorized
}
