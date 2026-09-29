export type Product = {
  id: string;
  slug: string;
  name: string;
  fabric: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  badge?: string;
  sizes: string[];
  image: string;
  gallery?: string[];
  category: string;
  color: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  isLuxe?: boolean;
  description: string;
};

const IMG = "https://lh3.googleusercontent.com/aida-public";
const highResolutionImage = (url: string) => `${url}=s2048`;

export const PRODUCTS: Product[] = [
  {
    id: "aubree-maxi-dress",
    slug: "aubree-maxi-dress",
    name: "Aubree Maxi Dress",
    fabric: "Printed Handloom Chanderi",
    price: 699,
    originalPrice: 2699,
    discount: "74% OFF",
    badge: "SALE",
    sizes: ["XS", "S", "M", "L", "XL"],
    image: `${IMG}/AB6AXuACU_YkO0gCdkCE5jxyY8czwVhV2U6tdHABPDhZXgokFUak36B8vYvXPGYUYFfpc5cQjOIROZMdTEQtMv2uQwFaZZbTlx3ljDzbWRMp8IFhMXQZwiod8HI2_36Coxv6KOHQzGFQAlSrSiopLoHyMx36Uhu9l2vWlG24VE1Vfn9NDzzv0pIW77pD19PtDycn8iyI5-mpFC-qySifLc4jAgNdwY_sSMfecD_rDQmnBXtqrw_ykLEm05E`,
    gallery: [
      `${IMG}/AB6AXuAFW3SXyoiIJeEbjzFq126SKHURtcRqQiaZ-bMDNyi6wJyF5y2IVWWIAp8cF-H9-WxC7uVUWw4bHXmbUO_mkh2vBOpeoD199ZhirV9fxqlvHMshd7aYSpsk-4yji8kYlteWQ_Cpi_jubb9mMZwbxaq2cnPwlb0ffCfQjZYh_ZBd7-FOjL-4KmtZBEQu6_V5-YzeXMiG6br6aq4VSm64VAAf20tqdlpqL7nCWzVM3lLe62F2XVocsb4`,
      `${IMG}/AB6AXuAhuA-hAkOsvvo36OAH5haM3C8F28zhNPwEW_LqRkGhEhlQkcn44hfr44QmDhzXszTmQW9ae8VE9BObW191bRu30cUGX86KgoVwFNpfNu3cTSbTavIqYOzenwf_wzGuRBlCr_r6jn9Np5gjxhti_zMhw29EVqDKBkRX3RglOfrN3cn2od0Wzdc1qYTRbGjXLnOmMi8pldzCvvI2B-hD_FZb6mVCtV5NCgH53nxDqjCOyI_FNzNPmhU`,
      `${IMG}/AB6AXuA3UbdxTY4hz96IMATEjuT-on_gnXafnUD3EcZ_SspUArPKvxJpNQ2YgXZJbIib2MXnOWsh5CZrrUJOK4qH_stBED6wZ5lLgQClWnqggd2wgjGujIIl5KU768ZR6QeW5IFAzbkFyEjgRLqEsvn8x-lz0ApMHx1GPARLo83sJxEZ11y1jakVLFRMJ7dv4dGoIpZxsUZ6PcAFySiDdgx9S1NxuklSYt0-6okncMRNgrkpFsqYQFggBqY`,
      `${IMG}/AB6AXuDZ_IJEF2QtqsqRu2y_L0lMcOgo-6R-UxGux_wvqV1P7FyYOA_UHJqfzIk_ja8z4ylrFN9w3EyPqG2KjMqgPccavUNvMXyHXa6NO85dz49rczxlEXl5svLlDtQWviKrsZAnPPuBwy_CnlIGKsVdUPpMM_9mEZtx1qAewge4ccvAqL1C9Zw7i8COxMbbYl9C6D3xZUbzzNwjhg0eIrVZIh0lW8mdNWhO5FqKeLzQ30tLhZxQKBeeykw`,
    ],
    category: "Dresses",
    color: "Ivory Floral",
    rating: 4.9,
    reviews: 48,
    inStock: true,
    isBestSeller: true,
    description:
      "The Aubree Maxi Dress expresses effortless romanticism tailored in pure breathability. Designed with an airy relaxed tier silhouette, it cascades with poetic fluidity from sunrise gatherings to golden dusk soirées.",
  },
  {
    id: "pista-green-jacket-maxi",
    slug: "pista-green-jacket-maxi",
    name: "Pista Green Jacket Maxi",
    fabric: "Mulberry Silk & Georgette",
    price: 2799,
    badge: "NEW ARRIVAL",
    sizes: ["S", "M", "L"],
    image: `${IMG}/AB6AXuAFW3SXyoiIJeEbjzFq126SKHURtcRqQiaZ-bMDNyi6wJyF5y2IVWWIAp8cF-H9-WxC7uVUWw4bHXmbUO_mkh2vBOpeoD199ZhirV9fxqlvHMshd7aYSpsk-4yji8kYlteWQ_Cpi_jubb9mMZwbxaq2cnPwlb0ffCfQjZYh_ZBd7-FOjL-4KmtZBEQu6_V5-YzeXMiG6br6aq4VSm64VAAf20tqdlpqL7nCWzVM3lLe62F2XVocsb4`,
    category: "Dresses",
    color: "Pista Green",
    rating: 4.8,
    reviews: 32,
    inStock: true,
    isNew: true,
    description:
      "Pista mint green mulberry silk jacket dress with flowing georgette silhouette photographed in high fashion editorial portrait.",
  },
  {
    id: "debbaco-print-maxi-dress",
    slug: "debbaco-print-maxi-dress",
    name: "Debbaco Print Maxi Dress",
    fabric: "Organic Mulmul Cotton",
    price: 3099,
    badge: "SUSTAINABLE FIBRE",
    sizes: ["S", "L", "XL", "XXL"],
    image: `${IMG}/AB6AXuA3UbdxTY4hz96IMATEjuT-on_gnXafnUD3EcZ_SspUArPKvxJpNQ2YgXZJbIib2MXnOWsh5CZrrUJOK4qH_stBED6wZ5lLgQClWnqggd2wgjGujIIl5KU768ZR6QeW5IFAzbkFyEjgRLqEsvn8x-lz0ApMHx1GPARLo83sJxEZ11y1jakVLFRMJ7dv4dGoIpZxsUZ6PcAFySiDdgx9S1NxuklSYt0-6okncMRNgrkpFsqYQFggBqY`,
    category: "Dresses",
    color: "Terracotta",
    rating: 4.7,
    reviews: 21,
    inStock: true,
    description:
      "Earthy terracotta Debbaco print organic cotton mulmul maxi dress with flared sleeves and natural Bagru mud resist dye.",
  },
  {
    id: "blue-lilies-doria-dress",
    slug: "blue-lilies-doria-dress",
    name: "Blue Lilies Doria Dress",
    fabric: "Handcrafted Kota Doria",
    price: 1199,
    originalPrice: 4399,
    discount: "72% OFF",
    badge: "SALE",
    sizes: ["XS", "XL"],
    image: `${IMG}/AB6AXuAhuA-hAkOsvvo36OAH5haM3C8F28zhNPwEW_LqRkGhEhlQkcn44hfr44QmDhzXszTmQW9ae8VE9BObW191bRu30cUGX86KgoVwFNpfNu3cTSbTavIqYOzenwf_wzGuRBlCr_r6jn9Np5gjxhti_zMhw29EVqDKBkRX3RglOfrN3cn2od0Wzdc1qYTRbGjXLnOmMi8pldzCvvI2B-hD_FZb6mVCtV5NCgH53nxDqjCOyI_FNzNPmhU`,
    category: "Dresses",
    color: "Azure Blue",
    rating: 4.6,
    reviews: 18,
    inStock: true,
    description:
      "Blue Lilies Handpainted Kota Doria Dress with delicate artisanal azure lily motifs and hand-embroidered neckline, airy feminine silhouette.",
  },
  {
    id: "pink-tier-dress-with-jacket",
    slug: "pink-tier-dress-with-jacket",
    name: "Pink Tier Dress With Jacket",
    fabric: "Cotton Silk Blend",
    price: 799,
    originalPrice: 3099,
    discount: "74% OFF",
    badge: "SALE",
    sizes: ["S", "M", "L"],
    image: `${IMG}/AB6AXuDZ_IJEF2QtqsqRu2y_L0lMcOgo-6R-UxGux_wvqV1P7FyYOA_UHJqfzIk_ja8z4ylrFN9w3EyPqG2KjMqgPccavUNvMXyHXa6NO85dz49rczxlEXl5svLlDtQWviKrsZAnPPuBwy_CnlIGKsVdUPpMM_9mEZtx1qAewge4ccvAqL1C9Zw7i8COxMbbYl9C6D3xZUbzzNwjhg0eIrVZIh0lW8mdNWhO5FqKeLzQ30tLhZxQKBeeykw`,
    category: "Dresses",
    color: "Blush Pink",
    rating: 4.8,
    reviews: 26,
    inStock: true,
    description:
      "Soft blush Pink Tier Dress with matching cropped artisanal jacket, intricate resham threads and subtle shimmer in golden hour light.",
  },
  {
    id: "fuschia-tiered-flared-dress",
    slug: "fuschia-tiered-flared-dress",
    name: "Fuschia Tiered Flared Dress",
    fabric: "Flowing Poly-Georgette",
    price: 699,
    originalPrice: 2599,
    discount: "73% OFF",
    badge: "SALE",
    sizes: ["XS", "S", "M"],
    image: `${IMG}/AB6AXuCm6DEZWj01Zvy0GeMysM-yQQkoaU6QDrnxyPGZWTW10xsvINz4VALUMzE14aYksSl5Qde_aL6_xWXxoYLft-rBFy07H2nK22_hXdNE0zmuh8Gvd9DyQTR1tXa8f8DW0n0kYvU8IuNsveH5-2TKRdafakkZiXHiHBcMXpZLdhOX3eUVMStixGgWPYG8FSskUHyZzNmJ-hibX1QkykLRUsyNJRBAYhlUyqHmfv00T_1IRchxuvFK5cI`,
    category: "Dresses",
    color: "Fuschia",
    rating: 4.5,
    reviews: 14,
    inStock: true,
    description:
      "Vibrant Fuschia Tiered Flared Dress in motion on a fashion runway, dynamic drape of georgette fabric, warm ivory high-fashion lighting.",
  },
  {
    id: "black-organza-shirt-dress",
    slug: "black-organza-shirt-dress",
    name: "Black Organza Shirt Dress",
    fabric: "Crisp Organza Silk",
    price: 2599,
    sizes: ["XS", "S", "M"],
    image: `${IMG}/AB6AXuCm6DEZWj01Zvy0GeMysM-yQQkoaU6QDrnxyPGZWTW10xsvINz4VALUMzE14aYksSl5Qde_aL6_xWXxoYLft-rBFy07H2nK22_hXdNE0zmuh8Gvd9DyQTR1tXa8f8DW0n0kYvU8IuNsveH5-2TKRdafakkZiXHiHBcMXpZLdhOX3eUVMStixGgWPYG8FSskUHyZzNmJ-hibX1QkykLRUsyNJRBAYhlUyqHmfv00T_1IRchxuvFK5cI`,
    category: "Dresses",
    color: "Black",
    rating: 4.9,
    reviews: 37,
    inStock: true,
    isBestSeller: true,
    description:
      "Tailored luxury Black Organza Shirt Dress with mother-of-pearl buttons and sheer sleeves, editorial high fashion portrait against neutral stone background.",
  },
  {
    id: "solid-green-pure-linen-dress",
    slug: "solid-green-pure-linen-dress",
    name: "Solid Green Pure Linen Dress",
    fabric: "100% Belgian Flax Linen",
    price: 4699,
    badge: "LUXE ATELIER",
    sizes: ["XS", "M", "XL"],
    image: `${IMG}/AB6AXuAZBDmK7YB3Ly4VAXefMRMXNSlSpcm8aIfKlb3Hwgc7NIipp_NmIVkWhTgY8cJ5PeNts9S__znvRsec7dG5PGhmCYOWdpeHpCNbly5fWOjwAvORQ7izZejKx4OoFvj6C_2k79OPrXbeSF-Vin1RhnJuMzWYsmfhRpJOhKYjZYxbd2G1HwCO0_h1mvavwedr57PONjFo04eCUu-wYY7nbnLhvSDJbcZ0B2sA688EyQQsoPZnyam2k_o`,
    category: "Dresses",
    color: "Forest Sage",
    rating: 4.9,
    reviews: 44,
    inStock: true,
    isLuxe: true,
    isBestSeller: true,
    description:
      "Understated minimal Solid Emerald Green Pure Linen Dress with deep pockets and tailored lapel, natural relaxed texture, sunny minimalist courtyard backdrop.",
  },
  {
    id: "ivory-chanderi-kurta-set",
    slug: "ivory-chanderi-kurta-set",
    name: "Ivory Chanderi Kurta Set",
    fabric: "Handwoven Chanderi Silk",
    price: 3499,
    originalPrice: 5999,
    discount: "42% OFF",
    badge: "SALE",
    sizes: ["S", "M", "L", "XL"],
    image: `${IMG}/AB6AXuCVnpU3fPDmkizRQ7waoHZIhwIz_xubELIKoA2AXpi3Nz6ikhN1qz05p3Qw-skq_wDmrs4tfjwCjhqNwwt-aXumVoDT6FDrUWFftUxWMXsgO4CsoH6EkD3AR-puckL3P-PQIVEMhLIpcIf-imk4dlwKHLnnl_bxdJ66AOfGzUcrTBNrpITroMrRxLwKRWcB5Q1OPzI34Ph6U0IQNxJFQg8dpW7h3ome9zb8ou6mLn8G_M0FPyoK9Rs`,
    category: "Ethnic Wear",
    color: "Ivory Gold",
    rating: 4.8,
    reviews: 29,
    inStock: true,
    description:
      "Ivory and gold woven Chanderi silk kurta set with sheer dupattas, intricate zari embroidery and relaxed straight pants.",
  },
  {
    id: "sage-handloom-coord-set",
    slug: "sage-handloom-coord-set",
    name: "Sage Handloom Co-Ord Set",
    fabric: "Wild Tussar Silk",
    price: 4299,
    badge: "NEW ARRIVAL",
    sizes: ["XS", "S", "M", "L"],
    image: `${IMG}/AB6AXuDfMa24JSiEPOiV46XGiLTZFldDRfH-5oKljvojYxsLw0q6nhVrWGf69dmby01VW0_1DDw1zgmFTizzVUwflD9kLC5UW5rwdXRcjQ8yG7jjI-qcUhd3p8bToVogN9ItpW-jVftexEa5j53wyTiApD7s6xG2Lt8YmAuwBYfF016hKEYFb9i_pyBwfLrkTFaYETeVvxVZjiV4F6R2Nfun8zb5m_g7T0YeFyMjPFImg4T11Zwje7jIvCM`,
    category: "Co-Ords & Jumpsuits",
    color: "Sage Green",
    rating: 4.7,
    reviews: 16,
    inStock: true,
    isNew: true,
    description:
      "Relaxed sage green handloom co-ord set with a lightweight draped overlay duster jacket standing in an art gallery.",
  },
  {
    id: "indigo-block-print-maxi",
    slug: "indigo-block-print-maxi",
    name: "Indigo Block Print Maxi",
    fabric: "Hand-block Printed Cotton",
    price: 1899,
    originalPrice: 3299,
    discount: "42% OFF",
    badge: "SALE",
    sizes: ["XS", "S", "M", "L", "XL"],
    image: `${IMG}/AB6AXuDrhil1q_o_uVPTeXJBjd52QrBQaBqOlXZwxhSC9JNm93F8UwD4BzZFxlnzvfMRSRaNxeYeNiu0TE9ArwMYYKTl5-0TiD91_FJPpbs7i0SzZa_CMvuIF0DjiScSL9wafQxMHFKEYW1qvW_1g9gVti2XHLUBJTOL7HarLmxZyqNyOJcj1HMMRrZ4MV0SP_g2vtjPHcsuqi0zGiaYNXNf1M6yGTq2YxHt0scnuelHijmkAAAAK7zrr20`,
    category: "Dresses",
    color: "Indigo",
    rating: 4.6,
    reviews: 23,
    inStock: true,
    description:
      "Ankle-length contemporary maxi dress featuring delicate floral indigo block prints against sunlit off-white linen architectural background.",
  },
  {
    id: "noor-organza-dupatta",
    slug: "noor-organza-dupatta",
    name: "Noor Organza Dupatta",
    fabric: "Zari Scallop Borders",
    price: 1250,
    sizes: ["One Size"],
    image: `${IMG}/AB6AXuCEdwc6texAZPnRgCA2tyrRVhnF5c6PxgO_VvoEXx3hYaErVxgHXvoE5KhBooAe4nLtltW-nWULrVex8UlR0O6gIfg0-Sxq5-L2CL-BTOHylc9DemsDgTrTM2lxcxhRwEeddOT5rrV1d0gcuqzLR0hZ8teawGkpeHKI6KuaILd7d4YYMNaeoYQ3LD_3sHW8n7vZ9CdEf_RstqLMzNIj5Yi7owu-vhoUuKD0MjhaZivOaWzDvww6Xxo`,
    category: "Accessories",
    color: "Ivory Gold",
    rating: 4.9,
    reviews: 12,
    inStock: true,
    description:
      "Sheer Ivory and Golden Sheen Organza Dupatta with hand-stitched scallop embroidery and delicate zari tassels, luxury editorial drape accessory.",
  },
];

for (const product of PRODUCTS) {
  product.image = highResolutionImage(product.image);
  product.gallery = product.gallery?.map(highResolutionImage);
}

export const getProduct = (slug: string) =>
  PRODUCTS.find((p) => p.slug === slug);

export const formatINR = (n: number) =>
  "₹" + n.toLocaleString("en-IN");

export const HERO_IMAGE = highResolutionImage(
  `${IMG}/AB6AXuAGm-Kt6qzGWPRkbcauJmUosCiXoRrQcMJtkCZ00hD9zUBI7LIBGTogfng1sMrSlsQZhZvhehN-AOQxv2WRoSCY1hopf-9h3MXEWVkGqVjqEw15j44guNBrk1evcoxz6lq0ggRn_H2WMLQrgeVUakIxXxpLNfGSPB4VKbsypUDpIvidfX4-Hgu9NnCVOjiBWRl3nyIhntJjZOAeN6dj4YkFHiWIkUg01e0cc8YrV0zZRafyInqo2qI`
);

export const HERITAGE_IMAGE = `${IMG}/AB6AXuCCsUjZw9CCnXuQaDHJBkJa6Iy54lU1J2p2cZ306ohutEhJqVdsDh4Q-eRLc_Cg59HMJIV6ootFEqoKUZjC5b_4ohY-uCnwzJr4UJ_hlS-K54y8L457gnjcK2gqXlJGA8GUFgSt-pJ45xVXOoqoWVOcwhrVrQ0kfSnPrxhd_MXF4LuxfBsWzAbVCo8lc6Qr409Ub-uEYgbh2TaVSEVKO9AEDD-ejx1wZ-cVNAeRLDS7V34AFcMIgvI`;

export const LOGO_URL = "";

export const AVATAR_URL = `${IMG}/AB6AXuBK_TgvI0Oq57M8f12qN3i-2X8rfVP5JR5Lj5TZ5grEZFCTr3F5MydTYsinoWMmZsQP4xVkqMPv3cUS2lPWij0qLBATAdefbhpvJMOr70It0mMT-YutJtw_tf5f_Wo5YwyL0TPBAlv2TmR9iBkB9AC0ype4Pa4-7Bn5YxJN1MxbTbdr86o9XCuxXYpcTn3cO68I1sKNEobzxPQccpNm4qhR1kudk8zebKvvVkavXBKA2GmR9BXhJ4A`;
