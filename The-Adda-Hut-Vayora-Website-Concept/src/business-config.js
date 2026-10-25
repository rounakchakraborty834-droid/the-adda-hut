/**
 * Central business configuration for the concept site.
 * @typedef {{name:string, tagline:string, category:string, address:string, addressDisplay:string, phoneDisplay:string, phoneE164:string, whatsappDigits:string, instagramUrl:string, websiteUrl:string, mapsSearchUrl:string, reviewsUrl:string, rating:number, reviewCount:number, ratingSource:string, ratingCheckedOn:string, publishedHours:null, menuStatus:string, packagesStatus:string, conceptOnly:boolean}} BusinessConfig
 */
/** @type {BusinessConfig} */
export const BUSINESS = Object.freeze({
  name: "The Adda Hut",
  tagline: "Humare yaha party ni kari? Log kya kahenge!",
  category: "Private celebration and event venue",
  address: "Milan More Road, Jadubhitar Chhat, Siliguri, West Bengal 734003, India",
  addressDisplay: "Milan More Road, Jadubhitar Chhat\nSiliguri, West Bengal 734003, India",
  phoneDisplay: "+91 90911 94150",
  phoneE164: "+919091194150",
  whatsappDigits: "919091194150",
  instagramUrl: "https://www.instagram.com/theaddahut/",
  websiteUrl: "https://theaddahut.com/",
  mapsSearchUrl: "https://www.google.com/maps/search/?api=1&query=The%20Adda%20Hut%20Milan%20More%20Road%20Jadubhitar%20Chhat%20Siliguri%20West%20Bengal%20734003",
  reviewsUrl: "https://www.google.com/maps/search/?api=1&query=The%20Adda%20Hut%20Milan%20More%20Road%20Siliguri%20West%20Bengal%20734003",
  rating: 3.9,
  reviewCount: 343,
  ratingSource: "Matching Google business listing returned in web lookup",
  ratingCheckedOn: "2026-10-25",
  // Hours in the matching live listing and indexed website content conflicted. Leave unpublished until confirmed.
  publishedHours: null,
  menuStatus: "Requires direct venue confirmation",
  packagesStatus: "Requires direct venue confirmation; no prices are published on this concept site",
  conceptOnly: true
});
