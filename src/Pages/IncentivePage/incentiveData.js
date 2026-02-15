export const incentiveData = {
  sales: [
    {
      id: 1,
      name: "QA Sales Target",
      incentiveType: "Sales",
      target: 10000,
      actual: 9500,
      bonusPot: 500,
      startDate: "2024-10-01",
      endDate: "2025-01-31", // 1+ month left
      status: "running",
      createdDate: "2024-10-01",
      deleted: false,
      proRataBonus: "YES",
      bonusAchieved: false
    },
    {
      id: 2,
      name: "My Sales Target",
      incentiveType: "Sales",
      target: 10000,
      actual: 9500,
      bonusPot: 500,
      startDate: "2025-12-01",
      endDate: "2025-12-30", // ~2 weeks left
      status: "running",
      createdDate: "2024-12-01",
      deleted: false,
      proRataBonus: "NO",
      bonusAchieved: false
    },
    {
      id: 3,
      name: "Monthly Revenue",
      incentiveType: "Sales",
      target: 5000,
      actual: 5200,
      bonusPot: 300,
      startDate: "2025-12-29",
      endDate: "2025-12-31", // Recently expired
      status: "expired",
      createdDate: "2024-11-25",
      deleted: false,
      proRataBonus: "YES",
      bonusAchieved: true
    },
    {
      id: 4,
      name: "Product Sales",
      incentiveType: "Sales",
      target: 8000,
      actual: 7200,
      bonusPot: 400,
      startDate: "2025-12-15",
      endDate: "2025-12-30", // ~1 week left
      status: "running",
      createdDate: "2024-12-10",
      deleted: false,
      proRataBonus: "YES",
      bonusAchieved: false
    },
    {
      id: 5,
      name: "Quarterly Target",
      incentiveType: "Sales",
      target: 25000,
      actual: 20000,
      bonusPot: 1000,
      startDate: "2025-12-20",
      endDate: "2025-12-31", // 3 months left
      status: "running",
      createdDate: "2024-12-15",
      deleted: false,
      proRataBonus: "NO",
      bonusAchieved: false
    },
    {
      id: 6,
      name: "Holiday Sales",
      incentiveType: "Sales",
      target: 15000,
      actual: 16000,
      bonusPot: 750,
      startDate: "2025-11-20",
      endDate: "2025-11-27", // Recently expired
      status: "expired",
      createdDate: "2024-11-01",
      deleted: false,
      proRataBonus: "NO",
      bonusAchieved: true
    },
    {
      id: 7,
      name: "Year-End Push",
      incentiveType: "Sales",
      target: 12000,
      actual: 9800,
      bonusPot: 600,
      startDate: "2025-12-11",
      endDate: "2025-12-30", // Less than 1 week left
      status: "running",
      createdDate: "2024-12-15",
      deleted: false,
      proRataBonus: "YES",
      bonusAchieved: false
    },
    {
      id: 8,
      name: "New Year Launch",
      incentiveType: "Sales",
      target: 18000,
      actual: 5200,
      bonusPot: 900,
      startDate: "2024-01-01",
      endDate: "2024-01-31", // ~1 month left
      status: "running",
      createdDate: "2024-12-20",
      deleted: false,
      proRataBonus: "NO",
      bonusAchieved: false
    },
    {
      id: 9,
      name: "Spring Campaign",
      incentiveType: "Sales",
      target: 30000,
      actual: 12500,
      bonusPot: 1500,
      startDate: "2025-03-01",
      endDate: "2025-05-31", // ~5 months left
      status: "running",
      createdDate: "2025-02-15",
      deleted: false,
      proRataBonus: "YES",
      bonusAchieved: false
    },
    {
      id: 10,
      name: "Deleted Sales Goal",
      incentiveType: "Sales",
      target: 10000,
      actual: 5000,
      bonusPot: 300,
      startDate: "2024-09-01",
      endDate: "2024-09-30", // Long expired
      status: "expired",
      createdDate: "2024-08-15",
      deleted: true,
      proRataBonus: "NO",
      bonusAchieved: false
    }
  ],
  reviews: [
    {
      id: 1,
      name: "Customer Reviews",
      incentiveType: "Reviews",
      target: 5.0,
      actual: 4.5,
      bonusPot: 100,
      startDate: "2025-11-12",
      endDate: "2025-12-31", // Expired
      status: "expired",
      createdDate: "2024-10-01",
      deleted: false,
      proRataBonus: "YES",
      bonusAchieved: false
    },
    {
      id: 2,
      name: "5-Star Reviews",
      incentiveType: "Reviews",
      target: 3.0,
      actual: 3.5,
      bonusPot: 150,
      startDate: "2024-12-01",
      endDate: "2025-01-31", // ~1 month left
      status: "running",
      createdDate: "2024-11-20",
      deleted: false,
      proRataBonus: "NO",
      bonusAchieved: true
    },
    {
      id: 3,
      name: "Product Feedback",
      incentiveType: "Reviews",
      target: 4.0,
      actual: 3.8,
      bonusPot: 120,
      startDate: "2025-12-20",
      endDate: "2025-12-31", // ~3 weeks left
      status: "running",
      createdDate: "2024-12-15",
      deleted: false,
      proRataBonus: "YES",
      bonusAchieved: false
    },
    {
      id: 4,
      name: "Q1 Review Drive",
      incentiveType: "Reviews",
      target: 4.5,
      actual: 4.2,
      bonusPot: 200,
      startDate: "2025-01-01",
      endDate: "2025-01-15", // Less than 2 weeks left
      status: "running",
      createdDate: "2024-12-20",
      deleted: false,
      proRataBonus: "YES",
      bonusAchieved: false
    },
    {
      id: 5,
      name: "Website Ratings",
      incentiveType: "Reviews",
      target: 4.8,
      actual: 4.9,
      bonusPot: 250,
      startDate: "2024-12-01",
      endDate: "2025-06-28", // ~2 months left
      status: "running",
      createdDate: "2024-11-25",
      deleted: false,
      proRataBonus: "NO",
      bonusAchieved: true
    },
    {
      id: 6,
      name: "App Store Reviews",
      incentiveType: "Reviews",
      target: 4.2,
      actual: 4.0,
      bonusPot: 180,
      startDate: "2025-12-11",
      endDate: "2025-12-31", // Recently expired
      status: "expired",
      createdDate: "2024-10-25",
      deleted: false,
      proRataBonus: "YES",
      bonusAchieved: false
    },
    {
      id: 7,
      name: "Deleted Review Goal",
      incentiveType: "Reviews",
      target: 2.5,
      actual: 1.6,
      bonusPot: 200,
      startDate: "2025-11-11",
      endDate: "2025-12-31", // Long expired
      status: "expired",
      createdDate: "2024-08-15",
      deleted: true,
      proRataBonus: "YES",
      bonusAchieved: false
    }
  ],
  upsell: [
    {
      id: 1,
      name: "Premium Upsell Upgrades",
      incentiveType: "Upsell",
      target: 3000,
      actual: 3500,
      bonusPot: 350,
      startDate: "2024-10-01",
      endDate: "2025-02-28", // ~2 months left
      status: "running",
      createdDate: "2024-09-15",
      deleted: false,
      proRataBonus: "YES",
      bonusAchieved: true
    },
    {
      id: 2,
      name: "Breakfast Upsell Items",
      incentiveType: "Upsell",
      target: 2000,
      actual: 1800,
      bonusPot: 200,
      startDate: "2025-12-12",
      endDate: "2025-12-31", // Recently expired
      status: "expired",
      createdDate: "2024-10-25",
      deleted: false,
      proRataBonus: "YES",
      bonusAchieved: false
    },
    {
      id: 3,
      name: "Bundle Upsell Sales",
      incentiveType: "Upsell",
      target: 4000,
      actual: 4200,
      bonusPot: 450,
      startDate: "2025-12-10",
      endDate: "2025-12-30", // ~2 weeks left
      status: "running",
      createdDate: "2024-12-05",
      deleted: false,
      proRataBonus: "YES",
      bonusAchieved: true
    },
    {
      id: 4,
      name: "Annual Upsell Upgrades",
      incentiveType: "Upsell",
      target: 10000,
      actual: 8000,
      bonusPot: 800,
      startDate: "2025-11-01",
      endDate: "2025-11-31", // ~6 months left
      status: "running",
      createdDate: "2024-12-20",
      deleted: false,
      proRataBonus: "YES",
      bonusAchieved: false
    },
    {
      id: 5,
      name: "Service Add-ons",
      incentiveType: "Upsell",
      target: 5000,
      actual: 3200,
      bonusPot: 400,
      startDate: "2024-12-15",
      endDate: "2025-01-08", // Less than 1 week left
      status: "running",
      createdDate: "2024-12-10",
      deleted: false,
      proRataBonus: "NO",
      bonusAchieved: false
    },
    {
      id: 6,
      name: "Premium Features",
      incentiveType: "Upsell",
      target: 7500,
      actual: 8900,
      bonusPot: 750,
      startDate: "2024-11-15",
      endDate: "2025-01-31", // ~1 month left
      status: "running",
      createdDate: "2024-11-01",
      deleted: false,
      proRataBonus: "YES",
      bonusAchieved: true
    },
    {
      id: 7,
      name: "Warranty Extensions",
      incentiveType: "Upsell",
      target: 3000,
      actual: 2100,
      bonusPot: 300,
      startDate: "2025-12-01",
      endDate: "2025-12-31", // ~3 months left
      status: "running",
      createdDate: "2024-12-20",
      deleted: false,
      proRataBonus: "YES",
      bonusAchieved: false
    },
    {
      id: 8,
      name: "Training Packages",
      incentiveType: "Upsell",
      target: 6000,
      actual: 4500,
      bonusPot: 600,
      startDate: "2024-10-01",
      endDate: "2024-12-15", // Recently expired
      status: "expired",
      createdDate: "2024-09-25",
      deleted: false,
      proRataBonus: "NO",
      bonusAchieved: false
    },
    {
      id: 9,
      name: "Maintenance Plans",
      incentiveType: "Upsell",
      target: 8000,
      actual: 9200,
      bonusPot: 800,
      startDate: "2025-12-01",
      endDate: "2025-12-30", // ~4 months left
      status: "running",
      createdDate: "2024-11-25",
      deleted: false,
      proRataBonus: "YES",
      bonusAchieved: true
    },
    {
      id: 10,
      name: "Deleted Upsell Goal",
      incentiveType: "Upsell",
      target: 5000,
      actual: 2000,
      bonusPot: 250,
      startDate: "2025-12-01",
      endDate: "2025-12-31", // Long expired
      status: "expired",
      createdDate: "2024-08-15",
      deleted: true,
      proRataBonus: "YES",
      bonusAchieved: false
    }
  ],
  audits: []
};