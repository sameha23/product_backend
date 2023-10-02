CREATE DATABASE /*!32312 IF NOT EXISTS*/`grocery_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;

USE `grocery_db`;

/*Table structure for table `products` */

DROP TABLE IF EXISTS `products`;

CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `products` */

insert  into `products`(`id`,`name`,`description`,`price`,`image`) values 
(1,'iPhone 9','An apple mobile which is nothing like apple',549.00,'uploads\\1696259153453-thumbnail.jpg'),
(2,'iPhone X','SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...',899.00,'uploads\\1696259373406-thumbnail.jpg'),
(3,'Samsung Universe 9','Samsung\'s new variant which goes beyond Galaxy to the Universe',1249.00,'uploads\\1696259388484-thumbnail.jpg'),
(4,'OPPOF19','OPPO F19 is officially announced on April 2021.',280.00,'uploads\\1696259396006-thumbnail.jpg'),
(5,'Huawei P30','Huawei’s re-badged P30 Pro New Edition was officially unveiled yesterday in Germany and now the device has made its way to the UK.',499.00,'uploads\\1696259404548-thumbnail.jpg'),
(6,'MacBook Pro','MacBook Pro 2021 with mini-LED display may launch between September, November',1749.00,'uploads\\1696259420760-thumbnail.png'),
(7,'Samsung Galaxy Book','Samsung Galaxy Book S (2020) Laptop With Intel Lakefield Chip, 8GB of RAM Launched',1499.00,'uploads\\1696259427226-thumbnail.jpg'),
(8,'Microsoft Surface Laptop 4','Style and speed. Stand out on HD video calls backed by Studio Mics. Capture ideas on the vibrant touchscreen.',1499.00,'uploads\\1696259434241-thumbnail.jpg'),
(9,'Infinix INBOOK','Infinix Inbook X1 Ci3 10th 8GB 256GB 14 Win10 Grey – 1 Year Warranty',1099.00,'uploads\\1696259440564-thumbnail.jpg'),
(10,'HP Pavilion 15-DK1056WM','HP Pavilion 15-DK1056WM Gaming Laptop 10th Gen Core i5, 8GB, 256GB SSD, GTX 1650 4GB, Windows 10',1099.00,'uploads\\1696259446964-thumbnail.jpeg'),
(11,'perfume Oil','Mega Discount, Impression of Acqua Di Gio by GiorgioArmani concentrated attar perfume Oil',13.00,'uploads\\1696259453859-thumbnail.jpg'),
(12,'Brown Perfume','Royal_Mirage Sport Brown Perfume for Men & Women - 120ml',40.00,'uploads\\1696259461651-thumbnail.jpg'),
(13,'Fog Scent Xpressio Perfume','Product details of Best Fog Scent Xpressio Perfume 100ml For Men cool long lasting perfumes for Men',13.00,'uploads\\1696259469551-thumbnail.webp'),
(14,'Non-Alcoholic Concentrated Perfume Oil','Original Al Munakh® by Mahal Al Musk | Our Impression of Climate | 6ml Non-Alcoholic Concentrated Perfume Oil',120.00,'uploads\\1696259476193-thumbnail.jpg'),
(15,'Eau De Perfume Spray','Genuine  Al-Rehab spray perfume from UAE/Saudi Arabia/Yemen High Quality',30.00,'uploads\\1696259482363-thumbnail.jpg'),
(16,'Hyaluronic Acid Serum','L\'OrÃ©al Paris introduces Hyaluron Expert Replumping Serum formulated with 1.5% Hyaluronic Acid',19.00,'uploads\\1696259488503-thumbnail.jpg'),
(17,'Tree Oil 30ml','Tea tree oil contains a number of compounds, including terpinen-4-ol, that have been shown to kill certain bacteria,',12.00,'uploads\\1696259495396-thumbnail.jpg'),
(18,'Oil Free Moisturizer 100ml','Dermive Oil Free Moisturizer with SPF 20 is specifically formulated with ceramides, hyaluronic acid & sunscreen.',40.00,'uploads\\1696259503024-thumbnail.jpg'),
(19,'Skin Beauty Serum.','Product name: rorec collagen hyaluronic acid white face serum riceNet weight: 15 m',46.00,'uploads\\1696259509796-thumbnail.jpg'),
(20,'Eau De Perfume Spray','Genuine  Al-Rehab spray perfume from UAE/Saudi Arabia/Yemen High Quality',30.00,'uploads\\1696259515293-thumbnail.jpg');

