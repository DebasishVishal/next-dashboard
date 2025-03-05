export const DUMMY_APPS = Array.from({ length: 40 }, (_, i) => ({
  appId: `${i + 1}`, // Changed `id` to `appId` to match your App interface
  name: i % 2 === 0 ? "DropshippingCopilot" : "Theme Scheduler",
  platform: i % 2 === 0 ? "AliExpress" : "",
  tagline:
    i % 2 === 0
      ? "AliExpress's all-in-one dropshipping solution"
      : "Original Theme Scheduler trusted by over 100 stores on Plus",
  rating: Math.floor(Math.random() * 5) + 1, // Random rating between 1 and 5
  reviews: Math.floor(Math.random() * 4644) + 1,
  iconUrl:
    "https://cdn.shopify.com/app-store/listing_images/25be81443465e6699946f54e436f7a0b/icon/CLSe3bzd_4QDEAE=.png",
  isFollowing: true,
}));

export const DUMMY_CATEGORIES = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  name: `Cat ${i + 1}`,
  description: `Description for category ${i + 1}`,
  itemCount: Math.floor(Math.random() * 1000),
  isFollowing: Math.random() > 0.5,
}));

export const DUMMY_KEYWORDS = Array.from({ length: 9 }, (_, i) => ({
  id: i + 1,
  keyword: `key-${i + 1}`,
  searchVolume: Math.floor(Math.random() * 10000),
  trending: Math.random() > 0.7,
  isFollowing: Math.random() > 0.5,
}));
