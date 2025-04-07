import prisma from '@/lib/prisma';

async function main() {
    await prisma.product.createMany({
        data: [
            {
                name: "Fjallraven Foldsack No. 1 Backpack",
                price: 109.95,
                description: "Perfect for everyday use and forest walks. Features a padded sleeve for laptops up to 15 inches.",
                image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
                stock: 113,
                categoryId: 1, // Assuming Men category ID is 1
                deleted: false,
            },
            {
                name: "Men's Slim Fit T-Shirts (3-Pack)",
                price: 22.3,
                description: "Slim-fitting, contrast raglan long sleeves, three-button henley placket. Lightweight & soft fabric for breathable comfort. Solid stitched, round neck for durability.",
                image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
                stock: 246,
                categoryId: 1, // Assuming Men category ID is 1
                deleted: false,
            },
            {
                name: "Men's Cotton Jacket",
                price: 55.99,
                description: "Great outerwear for Spring/Autumn/Winter. Suitable for working, hiking, camping, climbing, cycling, traveling. Ideal gift for family.",
                image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
                stock: 487,
                categoryId: 1, // Assuming Men category ID is 1
                deleted: false,
            },
            {
                name: "Men's Slim Fit Casual Shirt",
                price: 15.99,
                description: "Note: Color may vary slightly. Please review detailed size information in the product description, as body builds vary.",
                image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
                stock: 427,
                categoryId: 1, // Assuming Men category ID is 1
                deleted: false,
            },
            {
                name: "John Hardy Women's Legends Naga Bracelet",
                price: 695,
                description: "From the Legends Collection, inspired by the mythical water dragon. Wear inward for love and abundance, outward for protection.",
                image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
                stock: 400,
                categoryId: 4, // Assuming Jewelry category ID is 4
                deleted: false,
            },
            {
                name: "Solid Gold Petite Micropave Ring",
                price: 168,
                description: "Satisfaction Guaranteed. Return or exchange within 30 days. Designed and sold by Hafeez Center in the United States.",
                image: "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
                stock: 70,
                categoryId: 4, // Assuming Jewelry category ID is 4
                deleted: false,
            },
            {
                name: "White Gold Plated Princess Ring",
                price: 9.99,
                description: "Classic Created Wedding Engagement Solitaire Diamond Promise Ring. Perfect gift for Engagement, Wedding, Anniversary, Valentine's Day.",
                image: "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
                stock: 399,
                categoryId: 4, // Assuming Jewelry category ID is 4
                deleted: false,
            },
            {
                name: "Rose Gold Plated Tunnel Plug Earrings",
                price: 10.99,
                description: "Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Stainless Steel.",
                image: "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg",
                stock: 99,
                categoryId: 4, // Assuming Jewelry category ID is 4
                deleted: false,
            },
            {
                name: "WD 2TB Portable External Hard Drive",
                price: 64,
                description: "USB 3.0 and USB 2.0 Compatible. Fast data transfers. Improves PC Performance. Formatted NTFS for Windows. Reformatting may be required for other OS.",
                image: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
                stock: 203,
                categoryId: 3, // Assuming Electronics category ID is 3
                deleted: false,
            },
            {
                name: "SanDisk 1TB Internal SSD",
                price: 109,
                description: "Easy upgrade for faster boot up, shutdown, application load and response. Boosts burst write performance. Read/write speeds up to 535MB/s/450MB/s.",
                image: "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
                stock: 466,
                categoryId: 3, // Assuming Electronics category ID is 3
                deleted: false,
            },
            {
                name: "Silicon Power 256GB Internal SSD",
                price: 109,
                description: "3D NAND flash for high transfer speeds. Faster bootup and improved system performance. SLC Cache Technology. 7mm slim design. Supports TRIM, Garbage Collection, RAID, ECC.",
                image: "https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg",
                stock: 315,
                categoryId: 3, // Assuming Electronics category ID is 3
                deleted: false,
            },
            {
                name: "WD 4TB Gaming External Hard Drive",
                price: 114,
                description: "Expand your PS4 gaming experience. Portable and easy setup. Sleek design. 3-year manufacturer's limited warranty.",
                image: "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg",
                stock: 396,
                categoryId: 3, // Assuming Electronics category ID is 3
                deleted: false,
            },
            {
                name: "Acer 21.5-inch Full HD IPS Monitor",
                price: 599,
                description: "21.5 inch Full HD (1920 x 1080) widescreen IPS display. Radeon FreeSync technology. 75Hz refresh rate (HDMI). Zero-frame design, ultra-thin, 4ms response time.",
                image: "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg",
                stock: 250,
                categoryId: 3, // Assuming Electronics category ID is 3
                deleted: false,
            },
            {
                name: "Samsung 49-Inch Curved Gaming Monitor",
                price: 999.99,
                description: "49-inch Super Ultrawide 32:9 Curved Gaming Monitor with dual 27-inch screen side by side. Quantum Dot (QLED) technology, HDR support. 144Hz high refresh rate, 1ms response time.",
                image: "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg",
                stock: 140,
                categoryId: 3, // Assuming Electronics category ID is 3
                deleted: false,
            },
            {
                name: "Women's 3-in-1 Snowboard Jacket",
                price: 56.99,
                description: "US standard size. 100% Polyester; Detachable Liner: Warm Fleece. Stand Collar Liner jacket. Zippered Pockets. Adjustable and Detachable Hood and cuff. 3-in-1 Detachable Design.",
                image: "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg",
                stock: 235,
                categoryId: 2, // Assuming Women category ID is 2
                deleted: false,
            },
            {
                name: "Women's Faux Leather Moto Biker Jacket",
                price: 29.95,
                description: "100% POLYURETHANE(shell) 100% POLYESTER(lining) 75% POLYESTER 25% COTTON (SWEATER). Faux leather. Front pockets. Hooded denim style. Button detail on waist. Hand wash only.",
                image: "https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg",
                stock: 340,
                categoryId: 2, // Assuming Women category ID is 2
                deleted: false,
            },
            {
                name: "Women's Rain Jacket Windbreaker",
                price: 39.99,
                description: "Lightweight, perfect for travel or casual wear. Long sleeve with hooded, adjustable drawstring waist. Button and zipper front closure. Stripes Lined. 2 side pockets.",
                image: "https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg",
                stock: 679,
                categoryId: 2, // Assuming Women category ID is 2
                deleted: false,
            },
            {
                name: "Women's Solid Short Sleeve Boat Neck Top",
                price: 9.85,
                description: "95% RAYON 5% SPANDEX, Made in USA or Imported, Do Not Bleach, Lightweight fabric with great stretch, Ribbed on sleeves and neckline, Double stitching on bottom hem",
                image: "https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg",
                stock: 128,
                categoryId: 2, // Assuming Women category ID is 2
                deleted: false,
            },
            {
                name: "Women's Short Sleeve Moisture-Wicking Shirt",
                price: 7.95,
                description: "100% Polyester, Machine wash, 100% cationic polyester interlock, Lightweight, roomy and breathable, Soft Lightweight Fabric, Comfortable V-neck collar, Slimmer fit.",
                image: "https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg",
                stock: 135,
                categoryId: 2, // Assuming Women category ID is 2
                deleted: false,
            },
            {
                name: "Women's Casual Cotton Short Sleeve T-Shirt",
                price: 12.99,
                description: "95%Cotton,5%Spandex, Features: Casual, Short Sleeve, Letter Print, V-Neck, Fashion Tees, Soft and stretchy fabric. Occasion: Casual/Office/Beach/School/Home/Street. Season: Spring,Summer,Autumn,Winter.",
                image: "https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg",
                stock: 140,
                categoryId: 2, // Assuming Women category ID is 2
                deleted: false,
            },
        ],
    });

    console.log('Products seeded successfully!');
}

main()
    .catch((e) => {
        console.error('Error seeding products:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });