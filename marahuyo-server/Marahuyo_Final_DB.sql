-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: marahuyo
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `cart_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `prod_id` int NOT NULL,
  `prod_qty` int NOT NULL,
  `prod_total_price` decimal(10,2) NOT NULL,
  `prod_size_id` varchar(45) DEFAULT NULL,
  `prod_variant_id` varchar(45) DEFAULT NULL,
  `prod_category_id` int NOT NULL,
  PRIMARY KEY (`cart_id`),
  KEY `fk_cart_user_details1_idx` (`user_id`),
  KEY `fk_cart_products1_idx` (`prod_id`),
  KEY `fk_cart_prod_category1_idx` (`prod_category_id`),
  CONSTRAINT `fk_cart_prod_category1` FOREIGN KEY (`prod_category_id`) REFERENCES `prod_category` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_cart_products1` FOREIGN KEY (`prod_id`) REFERENCES `products` (`prod_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_cart_user_details1` FOREIGN KEY (`user_id`) REFERENCES `user_details` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `status_id` int NOT NULL,
  `order_date` datetime NOT NULL,
  `order_subtotal` decimal(10,2) NOT NULL,
  `taxes` decimal(10,2) NOT NULL,
  `order_total` decimal(10,2) NOT NULL,
  `payment_method` enum('maya','gcash','cod') NOT NULL,
  PRIMARY KEY (`order_id`),
  KEY `fk_order_order_status1_idx` (`status_id`),
  KEY `fk_order_user_details1_idx` (`user_id`),
  CONSTRAINT `fk_order_order_status1` FOREIGN KEY (`status_id`) REFERENCES `order_status` (`status_id`),
  CONSTRAINT `fk_order_user_details1` FOREIGN KEY (`user_id`) REFERENCES `user_details` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
INSERT INTO `order` VALUES (1,12,4,'2023-07-09 18:59:17',350.20,0.20,1.00,'cod'),(2,12,4,'2023-07-10 01:07:16',75.20,0.20,1.00,'cod'),(3,12,4,'2023-07-10 13:03:53',350.20,0.20,1.00,'cod');
/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_item`
--

DROP TABLE IF EXISTS `order_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_item` (
  `order_item_id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `prod_id` int NOT NULL,
  `product_qty` int NOT NULL,
  `product_price` decimal(10,2) NOT NULL,
  `prod_variant_id` int DEFAULT NULL,
  `prod_size_id` int DEFAULT NULL,
  PRIMARY KEY (`order_item_id`),
  KEY `fk_order_item_order1_idx` (`order_id`),
  KEY `fk_order_item_products1_idx` (`prod_id`),
  CONSTRAINT `fk_order_item_order1` FOREIGN KEY (`order_id`) REFERENCES `order` (`order_id`),
  CONSTRAINT `fk_order_item_products1` FOREIGN KEY (`prod_id`) REFERENCES `products` (`prod_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_item`
--

LOCK TABLES `order_item` WRITE;
/*!40000 ALTER TABLE `order_item` DISABLE KEYS */;
INSERT INTO `order_item` VALUES (1,1,50,1,350.00,37,87),(2,2,51,1,75.00,NULL,NULL),(3,3,50,1,350.00,37,87);
/*!40000 ALTER TABLE `order_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_status`
--

DROP TABLE IF EXISTS `order_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_status` (
  `status_id` int NOT NULL AUTO_INCREMENT,
  `status_name` varchar(45) NOT NULL,
  PRIMARY KEY (`status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_status`
--

LOCK TABLES `order_status` WRITE;
/*!40000 ALTER TABLE `order_status` DISABLE KEYS */;
INSERT INTO `order_status` VALUES (1,'TOPAY'),(2,'TOSHIP'),(3,'TORECEIVE'),(4,'COMPLETED'),(5,'CANCELLED'),(6,'RETURN');
/*!40000 ALTER TABLE `order_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prod_category`
--

DROP TABLE IF EXISTS `prod_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prod_category` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(255) NOT NULL,
  `prod_id` int NOT NULL,
  PRIMARY KEY (`category_id`),
  KEY `fk_prod_category_products1_idx` (`prod_id`),
  CONSTRAINT `fk_prod_category_products1` FOREIGN KEY (`prod_id`) REFERENCES `products` (`prod_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prod_category`
--

LOCK TABLES `prod_category` WRITE;
/*!40000 ALTER TABLE `prod_category` DISABLE KEYS */;
INSERT INTO `prod_category` VALUES (1,'Clothing',1),(2,'Lanyard',2),(3,'Bags',3),(4,'Bundle',4),(5,'Clothing',5),(6,'Bags',6),(7,'Lanyard',7),(8,'Clothing',8),(9,'Clothing',9),(10,'Clothing',10),(11,'Pins',11),(12,'Clothing',12),(13,'Clothing',13),(14,'Bundle',14),(15,'Bundle',15),(16,'Clothing',16),(17,'Bundle',17),(18,'Bags',18),(19,'Lanyard',19),(20,'Bundle',20),(21,'Bundle',21),(22,'Clothing',22),(23,'Clothing',23),(24,'Lanyard',24),(25,'Bundle',25),(26,'Bundle',26),(27,'Bags',27),(28,'Clothing',28),(29,'Bundle',29),(30,'Pins',30),(31,'Pins',31),(32,'Clothing',32),(33,'Bags',33),(34,'Bundle',34),(35,'Lanyard',35),(36,'Bundle',36),(37,'Bundle',37),(38,'Bundle',38),(39,'Clothing',39),(40,'Clothing',40),(41,'Clothing',41),(42,'Bundle',42),(43,'Lanyard',43),(44,'Clothing',44),(45,'Bundle',45),(46,'Bundle',46),(47,'Stickers',47),(48,'Clothing',48),(49,'Lanyard',49),(50,'Clothing',50),(51,'Lanyard',51),(52,'Lanyard',52),(53,'Clothing',53),(54,'Clothing',54),(55,'Clothing',55),(56,'Bags',56),(57,'Clothing',57);
/*!40000 ALTER TABLE `prod_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prod_image`
--

DROP TABLE IF EXISTS `prod_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prod_image` (
  `image_id` int NOT NULL AUTO_INCREMENT,
  `image_url` varchar(255) NOT NULL,
  `prod_id` int NOT NULL,
  `img_lbl` tinyint NOT NULL,
  PRIMARY KEY (`image_id`),
  KEY `fk_prod_image_products1_idx` (`prod_id`),
  CONSTRAINT `fk_prod_image_products1` FOREIGN KEY (`prod_id`) REFERENCES `products` (`prod_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prod_image`
--

LOCK TABLES `prod_image` WRITE;
/*!40000 ALTER TABLE `prod_image` DISABLE KEYS */;
INSERT INTO `prod_image` VALUES (1,'https://res.cloudinary.com/dxsdudkfz/image/upload/v1688891043/items/vhkqdtjdeedfga4bgynu.jpg',1,1),(2,'https://res.cloudinary.com/dxsdudkfz/image/upload/v1688891103/items/hezahinwsprpxsjs5fnx.jpg',2,1),(3,'https://res.cloudinary.com/dxsdudkfz/image/upload/v1688891142/items/vno4tk38adhucwtzzhry.jpg',3,1),(4,'https://res.cloudinary.com/dxsdudkfz/image/upload/v1688891201/items/qgpisjvkx39pzwap1qwh.jpg',4,1),(5,'https://res.cloudinary.com/dxsdudkfz/image/upload/v1688891597/items/gmilh7lcx2wvdzvuijht.jpg',5,1),(6,'https://res.cloudinary.com/dxsdudkfz/image/upload/v1688891681/items/a2w90fhnwxlozq5yogqj.jpg',6,1),(7,'https://res.cloudinary.com/dxsdudkfz/image/upload/v1688891681/items/osdhjwjo5cyqdaru83ys.jpg',6,0),(8,'https://res.cloudinary.com/dxsdudkfz/image/upload/v1688891748/items/sntaub2wsiwtaayqf8u0.jpg',7,1),(9,'https://res.cloudinary.com/dxsdudkfz/image/upload/v1688891801/items/swjmsm4fcsfdxm1ulsdr.jpg',8,1),(10,'https://res.cloudinary.com/dxsdudkfz/image/upload/v1688891835/items/mnlbgev8h6cywrieacxd.jpg',9,1),(11,'https://res.cloudinary.com/dxsdudkfz/image/upload/v1688891870/items/bybfkxnneedyzd9d37pw.jpg',10,1),(12,'https://res.cloudinary.com/dxsdudkfz/image/upload/v1688891921/items/yzojqiifdqkzryuydfqc.jpg',11,1),(13,'https://res.cloudinary.com/dxsdudkfz/image/upload/v1688892223/items/cqknai6dvdg5iunyj7hg.jpg',12,1),(14,'https://res.cloudinary.com/dxsdudkfz/image/upload/v1688892224/items/vq10zkupvsgp1toaelkp.jpg',12,0),(15,'https://res.cloudinary.com/dxsdudkfz/image/upload/v1688892300/items/m7netav9wsmchb11ybbl.jpg',13,1),(16,'https://res.cloudinary.com/dxsdudkfz/image/upload/v1688892352/items/ifvh6dsgiyim7jn3cbvn.jpg',14,1),(17,'https://res.cloudinary.com/dxsdudkfz/image/upload/v1688892395/items/y6uckpneqw3gxnlcu5dx.jpg',15,1),(18,'https://res.cloudinary.com/dxsdudkfz/image/upload/v1688892465/items/nctjbkbp5qnzvl0deg3n.jpg',16,1),(19,'https://res.cloudinary.com/dxsdudkfz/image/upload/v1688892503/items/mt4d3rpv5gwkkcq1kcux.jpg',17,1),(21,'https://res.cloudinary.com/dxsdudkfz/image/upload/v1688892588/items/glfzjk0em36tyn8apwyc.jpg',19,1),(22,'https://res.cloudinary.com/dxsdudkfz/image/upload/v1688892539/items/sz5apguq03a14ipviy6i.jpg',18,1),(23,'https://res.cloudinary.com/dxsdudkfz/image/upload/v1688892653/items/hjxxjyfn00yqqbjpdwgn.jpg',20,1),(24,'https://res.cloudinary.com/dxsdudkfz/image/upload/v1688892683/items/fgwjqw3km5vzerr1zy0z.jpg',21,1),(25,'https://res.cloudinary.com/dxsdudkfz/image/upload/v1688895400/items/lrrv91pads1kokpodzrj.jpg',22,1),(26,'https://res.cloudinary.com/dxsdudkfz/image/upload/v1688895455/items/a1cgs5vfuu00znywf4de.jpg',23,1),(27,'https://res.cloudinary.com/dxsdudkfz/image/upload/v1688895487/items/yhfhwnr8ngdvat2ijpsz.jpg',24,1),(28,'https://res.cloudinary.com/dxsdudkfz/image/upload/v1688895539/items/j7nie02voydf5ohhch9t.jpg',25,1),(29,'https://res.cloudinary.com/dxsdudkfz/image/upload/v1688895582/items/t9bor8iyfrsv6nzfk44b.jpg',26,1),(30,'https://res.cloudinary.com/dxsdudkfz/image/upload/v1688895613/items/yxvx1960jh89yprbd6cg.jpg',27,1),(31,'https://res.cloudinary.com/dxsdudkfz/image/upload/v1688895659/items/orudgwnoyjgzskdbzzxz.jpg',28,1),(32,'https://res.cloudinary.com/dxsdudkfz/image/upload/v1688895696/items/f9gtvxn1igvv7biq4djz.jpg',29,1),(33,'https://res.cloudinary.com/dxsdudkfz/image/upload/v1688895728/items/cub04mpaexfjq9xkbsxu.jpg',30,1),(35,'https://res.cloudinary.com/dxsdudkfz/image/upload/v1688896098/items/sclycuqf5a98sj23zvkf.jpg',32,1),(36,'https://res.cloudinary.com/dxsdudkfz/image/upload/v1688896150/items/kezj7adft6bntcqonzdf.jpg',32,0),(37,'https://res.cloudinary.com/dxsdudkfz/image/upload/v1688896323/items/opsaysf5s9gydyv4jtec.jpg',33,0),(38,'https://res.cloudinary.com/dxsdudkfz/image/upload/v1688896323/items/qvtwrc4lxepgrsh1vzoi.jpg',33,0),(39,'https://res.cloudinary.com/dxsdudkfz/image/upload/v1688896323/items/re7wrxadymejsglbre86.jpg',33,0),(40,'https://res.cloudinary.com/dxsdudkfz/image/upload/v1688896323/items/epecxphutcaesc9xvi17.jpg',33,0),(41,'https://res.cloudinary.com/dxsdudkfz/image/upload/v1688896324/items/wjvukznrvt5wrrpdqaa8.jpg',33,1),(42,'https://res.cloudinary.com/dxsdudkfz/image/upload/v1688896377/items/btqoslfqpjaycbx67xeb.jpg',34,1),(43,'https://res.cloudinary.com/dxsdudkfz/image/upload/v1688896412/items/btpwgqtczthyiq9phgqa.jpg',35,1),(44,'https://res.cloudinary.com/dxsdudkfz/image/upload/v1688896454/items/zqfeh5kqdspulhgbkoni.jpg',36,1),(45,'https://res.cloudinary.com/dxsdudkfz/image/upload/v1688896474/items/own9deo8waacdsmpgxum.jpg',37,1),(46,'https://res.cloudinary.com/dxsdudkfz/image/upload/v1688896515/items/e2ttfcyph9hkjznkhyl2.jpg',38,1),(47,'https://res.cloudinary.com/dxsdudkfz/image/upload/v1688896549/items/q8bflvl54voryyl0kxkh.jpg',39,1),(48,'https://res.cloudinary.com/dxsdudkfz/image/upload/v1688896829/items/jhg5ygriojtwhubivnph.jpg',40,0),(49,'https://res.cloudinary.com/dxsdudkfz/image/upload/v1688896828/items/c3epyq48r4adyr1xcxtv.jpg',40,0),(50,'https://res.cloudinary.com/dxsdudkfz/image/upload/v1688896829/items/tjswvdh8fxnxy7msha9h.jpg',40,0),(51,'https://res.cloudinary.com/dxsdudkfz/image/upload/v1688896829/items/jwdafbrpx6dk8oyqcwi8.jpg',40,1),(52,'https://res.cloudinary.com/dxsdudkfz/image/upload/v1688896829/items/upjdjy9d5mtisfkolrhy.jpg',40,0),(53,'https://res.cloudinary.com/dxsdudkfz/image/upload/v1688897165/items/hdbmfqxasz8kwuzl7slq.jpg',41,1),(54,'https://res.cloudinary.com/dxsdudkfz/image/upload/v1688897166/items/pzmycdsgojbxibeiuhx1.jpg',41,0),(55,'https://res.cloudinary.com/dxsdudkfz/image/upload/v1688897227/items/eazgriwara9jd2v3nmjf.jpg',42,1),(56,'https://res.cloudinary.com/dxsdudkfz/image/upload/v1688897263/items/p2gdmzr0kme1fsxglxm2.jpg',43,0),(57,'https://res.cloudinary.com/dxsdudkfz/image/upload/v1688897264/items/piv6ujipddkgtt0im3xm.jpg',43,1),(58,'https://res.cloudinary.com/dxsdudkfz/image/upload/v1688897309/items/qrk9jkz2lflm2la2kwzb.jpg',44,0),(59,'https://res.cloudinary.com/dxsdudkfz/image/upload/v1688897309/items/nsrwgqarst34ygqxuucq.jpg',44,1),(60,'https://res.cloudinary.com/dxsdudkfz/image/upload/v1688897349/items/gwc9qtr9bgog1z3e7z5g.jpg',45,1),(61,'https://res.cloudinary.com/dxsdudkfz/image/upload/v1688897380/items/hbeuz2s7c8wjgvszhyi2.jpg',46,1),(62,'https://res.cloudinary.com/dxsdudkfz/image/upload/v1688897649/items/kudwrotcfho2wzzjppxk.jpg',47,1),(63,'https://res.cloudinary.com/dxsdudkfz/image/upload/v1688897729/items/zi2wjgymnrbeps9irhds.jpg',48,1),(64,'https://res.cloudinary.com/dxsdudkfz/image/upload/v1688897728/items/jjclkjmqzpnzowcnudiy.jpg',48,0),(65,'https://res.cloudinary.com/dxsdudkfz/image/upload/v1688897729/items/dzp2dvngappsjuijb1w3.jpg',48,0),(66,'https://res.cloudinary.com/dxsdudkfz/image/upload/v1688897729/items/vkwwvyryyfwvoo0gsgxw.jpg',48,0),(67,'https://res.cloudinary.com/dxsdudkfz/image/upload/v1688897763/items/xdpayfy0vl0rxuzsh7ev.jpg',49,1),(68,'https://res.cloudinary.com/dxsdudkfz/image/upload/v1688898106/items/myhn7kc5chzf3coetjvg.jpg',50,0),(69,'https://res.cloudinary.com/dxsdudkfz/image/upload/v1688898107/items/nv1gti1sjcsjoypsq2af.jpg',50,1),(70,'https://res.cloudinary.com/dxsdudkfz/image/upload/v1688898155/items/bqwfpyg39lvbw2sysuo7.jpg',51,1),(71,'https://res.cloudinary.com/dxsdudkfz/image/upload/v1688898369/items/hbfqvktmkuiuo5h2fzcz.jpg',52,1),(72,'https://res.cloudinary.com/dxsdudkfz/image/upload/v1688898414/items/gfsvnchjluhtelw4nky2.jpg',53,1),(73,'https://res.cloudinary.com/dxsdudkfz/image/upload/v1688898454/items/cjodloygmt61utt37zih.jpg',54,1),(74,'https://res.cloudinary.com/dxsdudkfz/image/upload/v1688898536/items/ehbav76wi4hvdz5jlrnu.jpg',55,1),(75,'https://res.cloudinary.com/dxsdudkfz/image/upload/v1688898600/items/wkjq0sztwqoworjmyvjv.jpg',56,1),(82,'https://res.cloudinary.com/dxsdudkfz/image/upload/v1688953093/items/vfuk7ba2cuwebtterm9y.jpg',57,1),(83,'https://res.cloudinary.com/dxsdudkfz/image/upload/v1688953132/items/gfo6lqba0nknbqrks5qr.jpg',57,0);
/*!40000 ALTER TABLE `prod_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prod_size`
--

DROP TABLE IF EXISTS `prod_size`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prod_size` (
  `size_id` int NOT NULL AUTO_INCREMENT,
  `size_name` varchar(45) NOT NULL,
  `prod_id` int NOT NULL,
  PRIMARY KEY (`size_id`),
  KEY `fk_prod_size_products1_idx` (`prod_id`),
  CONSTRAINT `fk_prod_size_products1` FOREIGN KEY (`prod_id`) REFERENCES `products` (`prod_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=127 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prod_size`
--

LOCK TABLES `prod_size` WRITE;
/*!40000 ALTER TABLE `prod_size` DISABLE KEYS */;
INSERT INTO `prod_size` VALUES (1,'S',1),(2,'M',1),(3,'L',1),(4,'XL',1),(5,'S',5),(6,'M',5),(7,'L',5),(8,'XL',5),(9,'S',8),(10,'M',8),(11,'L',8),(12,'XL',8),(13,'S',9),(14,'M',9),(15,'L',9),(16,'XL',9),(17,'S',10),(18,'M',10),(19,'L',10),(20,'XL',10),(21,'S',12),(22,'L',12),(23,'XL',12),(24,'M',12),(25,'M',13),(26,'S',13),(27,'L',13),(28,'XL',13),(29,'2XL',13),(30,'S',16),(31,'L',16),(32,'XL',16),(33,'2XL',16),(34,'M',16),(35,'',18),(36,'S',22),(37,'M',22),(38,'L',22),(39,'XL',22),(40,'S',23),(41,'M',23),(42,'L',23),(43,'XL',23),(44,'S',28),(45,'M',28),(46,'L',28),(47,'XL',28),(53,'S',32),(54,'XL',32),(55,'L',32),(56,'2XL',32),(57,'M',32),(58,'S',39),(59,'L',39),(60,'XL',39),(61,'2XL',39),(62,'M',39),(63,'S',40),(64,'M',40),(65,'L',40),(66,'XL',40),(67,'2XL',40),(68,'S',41),(69,'L',41),(70,'XL',41),(71,'2XL',41),(72,'M',41),(73,'S',44),(74,'M',44),(75,'L',44),(76,'XL',44),(77,'2XL',44),(78,'S',48),(79,'M',48),(80,'L',48),(81,'XL',48),(82,'2XL',48),(83,'S',50),(84,'M',50),(85,'L',50),(86,'XL',50),(87,'2XL',50),(88,'S',53),(89,'M',53),(90,'L',53),(91,'XL',53),(92,'S',54),(93,'M',54),(94,'L',54),(95,'XL',54),(96,'M',55),(97,'S',55),(98,'L',55),(99,'XL',55),(100,'2XL',55),(101,'3XL',55),(111,'S',57),(112,'M',57),(113,'XL',57),(114,'L',57);
/*!40000 ALTER TABLE `prod_size` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prod_variant`
--

DROP TABLE IF EXISTS `prod_variant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prod_variant` (
  `variant_id` int NOT NULL AUTO_INCREMENT,
  `variant_color` varchar(255) NOT NULL,
  `prod_id` int NOT NULL,
  PRIMARY KEY (`variant_id`),
  KEY `fk_prod_variant_products1_idx` (`prod_id`),
  CONSTRAINT `fk_prod_variant_products1` FOREIGN KEY (`prod_id`) REFERENCES `products` (`prod_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prod_variant`
--

LOCK TABLES `prod_variant` WRITE;
/*!40000 ALTER TABLE `prod_variant` DISABLE KEYS */;
INSERT INTO `prod_variant` VALUES (1,'White',1),(2,'Black',3),(3,'White',3),(4,'Green',5),(5,'CITIANS',6),(6,'EXCITING',6),(7,'Black',8),(8,'White',9),(9,'Black',10),(10,'Black',13),(12,'White',18),(13,'Yellow',22),(14,'White',23),(15,'White',27),(16,'Black',28),(18,'Crossword',32),(19,'Faraday',32),(20,'kEEdlat',33),(21,'Liwanag sa Dilim',33),(22,'Electrical',33),(23,'Kahit Tres Lang',33),(24,'Future EE',33),(25,'Black',40),(26,'White',40),(27,'Black',44),(28,'White',44),(29,'Cream',47),(30,'White',47),(31,'Mustard',47),(32,'ESET',48),(33,'ZEVS',48),(34,'WHITE',48),(35,'CREAM',48),(36,'Hiru (White)',50),(37,' Yoru (Black)',50),(38,'Blue',53),(39,'White',54),(40,'Black',55),(41,'Makisig',56),(42,'Matahom(White)',56),(43,'Matahom(Black)',56),(50,'Black',57),(51,'White',57);
/*!40000 ALTER TABLE `prod_variant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_feedback`
--

DROP TABLE IF EXISTS `product_feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_feedback` (
  `feedback_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `prod_id` int NOT NULL,
  `feedback_desc` varchar(45) NOT NULL,
  `ratings` int NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`feedback_id`),
  KEY `fk_product_feedback_products1_idx` (`prod_id`),
  KEY `fk_product_feedback_user_details1_idx` (`user_id`),
  CONSTRAINT `fk_product_feedback_products1` FOREIGN KEY (`prod_id`) REFERENCES `products` (`prod_id`),
  CONSTRAINT `fk_product_feedback_user_details1` FOREIGN KEY (`user_id`) REFERENCES `user_details` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=401 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_feedback`
--

LOCK TABLES `product_feedback` WRITE;
/*!40000 ALTER TABLE `product_feedback` DISABLE KEYS */;
INSERT INTO `product_feedback` VALUES (1,1,1,'The product is excellent.',5,'2023-07-09'),(2,12,1,'The product is excellent.',5,'2023-07-09'),(3,13,1,'The product is just alright',3,'2023-07-09'),(4,14,1,'The product is disappointing.',1,'2023-07-09'),(5,15,1,'The product is seems sturdy enough.',4,'2023-07-09'),(6,16,1,'The product is not what I expected.',2,'2023-07-09'),(7,17,1,'The product is excellent.',5,'2023-07-09'),(8,18,1,'The product is just alright',3,'2023-07-09'),(9,19,1,'The product is seems sturdy enough.',4,'2023-07-09'),(10,20,1,'The product is excellent.',5,'2023-07-09'),(11,21,1,'The product is not what I expected.',2,'2023-07-09'),(12,22,1,'The product is disappointing.',1,'2023-07-09'),(13,23,1,'The product is excellent.',5,'2023-07-09'),(14,1,2,'The product is excellent.',5,'2023-07-09'),(15,12,2,'The product is excellent.',5,'2023-07-09'),(16,13,2,'The product is not what I expected.',2,'2023-07-09'),(17,14,2,'The product is just alright',3,'2023-07-09'),(18,15,2,'The product is seems sturdy enough.',4,'2023-07-09'),(19,16,2,'The product is disappointing.',1,'2023-07-09'),(20,17,2,'The product is not what I expected.',2,'2023-07-09'),(21,18,2,'The product is just alright',3,'2023-07-09'),(22,19,2,'The product is disappointing.',1,'2023-07-09'),(23,20,2,'The product is excellent.',5,'2023-07-09'),(24,21,2,'The product is seems sturdy enough.',4,'2023-07-09'),(25,22,2,'The product is just alright',3,'2023-07-09'),(26,23,2,'The product is excellent.',5,'2023-07-09'),(27,1,3,'The product is excellent.',5,'2023-07-09'),(28,12,3,'The product is excellent.',5,'2023-07-09'),(29,13,3,'The product is just alright',3,'2023-07-09'),(30,14,3,'The product is disappointing.',1,'2023-07-09'),(31,15,3,'The product is seems sturdy enough.',4,'2023-07-09'),(32,16,3,'The product is not what I expected.',2,'2023-07-09'),(33,17,3,'The product is excellent.',5,'2023-07-09'),(34,18,3,'The product is just alright',3,'2023-07-09'),(35,19,3,'The product is seems sturdy enough.',4,'2023-07-09'),(36,20,3,'The product is excellent.',5,'2023-07-09'),(37,21,3,'The product is not what I expected.',2,'2023-07-09'),(38,22,3,'The product is disappointing.',1,'2023-07-09'),(39,23,3,'The product is excellent.',5,'2023-07-09'),(40,1,4,'The product is excellent.',5,'2023-07-09'),(41,12,4,'The product is excellent.',5,'2023-07-09'),(42,13,4,'The product is just alright',3,'2023-07-09'),(43,14,4,'The product is disappointing.',1,'2023-07-09'),(44,15,4,'The product is seems sturdy enough.',4,'2023-07-09'),(45,16,4,'The product is not what I expected.',2,'2023-07-09'),(46,17,4,'The product is excellent.',5,'2023-07-09'),(47,18,4,'The product is just alright',3,'2023-07-09'),(48,19,4,'The product is seems sturdy enough.',4,'2023-07-09'),(49,20,4,'The product is excellent.',5,'2023-07-09'),(50,21,4,'The product is not what I expected.',2,'2023-07-09'),(51,22,4,'The product is disappointing.',1,'2023-07-09'),(52,23,4,'The product is excellent.',5,'2023-07-09'),(53,1,5,'The product is excellent.',5,'2023-07-09'),(54,12,5,'The product is excellent.',5,'2023-07-09'),(55,13,5,'The product is not what I expected.',2,'2023-07-09'),(56,14,5,'The product is just alright',3,'2023-07-09'),(57,15,5,'The product is seems sturdy enough.',4,'2023-07-09'),(58,16,5,'The product is disappointing.',1,'2023-07-09'),(59,17,5,'The product is not what I expected.',2,'2023-07-09'),(60,18,5,'The product is just alright',3,'2023-07-09'),(61,19,5,'The product is disappointing.',1,'2023-07-09'),(62,20,5,'The product is excellent.',5,'2023-07-09'),(63,21,5,'The product is seems sturdy enough.',4,'2023-07-09'),(64,22,5,'The product is just alright',3,'2023-07-09'),(65,23,5,'The product is excellent.',5,'2023-07-09'),(66,1,5,'The product is excellent.',5,'2023-07-09'),(67,12,6,'The product is excellent.',5,'2023-07-09'),(68,13,6,'The product is just alright',3,'2023-07-09'),(69,14,6,'The product is disappointing.',1,'2023-07-09'),(70,15,6,'The product is seems sturdy enough.',4,'2023-07-09'),(71,16,6,'The product is not what I expected.',2,'2023-07-09'),(72,17,6,'The product is excellent.',5,'2023-07-09'),(73,18,6,'The product is just alright',3,'2023-07-09'),(74,19,6,'The product is seems sturdy enough.',4,'2023-07-09'),(75,20,6,'The product is excellent.',5,'2023-07-09'),(76,21,6,'The product is not what I expected.',2,'2023-07-09'),(77,22,6,'The product is disappointing.',1,'2023-07-09'),(78,23,6,'The product is excellent.',5,'2023-07-09'),(79,12,7,'The product is excellent.',5,'2023-07-09'),(80,13,7,'The product is just alright',3,'2023-07-09'),(81,14,7,'The product is disappointing.',1,'2023-07-09'),(82,15,7,'The product is seems sturdy enough.',4,'2023-07-09'),(83,16,7,'The product is not what I expected.',2,'2023-07-09'),(84,17,7,'The product is excellent.',5,'2023-07-09'),(85,18,7,'The product is just alright',3,'2023-07-09'),(86,19,7,'The product is seems sturdy enough.',4,'2023-07-09'),(87,20,7,'The product is excellent.',5,'2023-07-09'),(88,21,7,'The product is not what I expected.',2,'2023-07-09'),(89,22,7,'The product is disappointing.',1,'2023-07-09'),(90,23,7,'The product is excellent.',5,'2023-07-09'),(91,1,7,'The product is seems sturdy enough.',4,'2023-07-09'),(92,1,8,'The product is excellent.',5,'2023-07-09'),(93,12,8,'The product is excellent.',5,'2023-07-09'),(94,13,8,'The product is just alright',3,'2023-07-09'),(95,14,8,'The product is disappointing.',1,'2023-07-09'),(96,15,8,'The product is seems sturdy enough.',4,'2023-07-09'),(97,16,8,'The product is not what I expected.',2,'2023-07-09'),(98,17,8,'The product is excellent.',5,'2023-07-09'),(99,18,8,'The product is just alright',3,'2023-07-09'),(100,19,8,'The product is seems sturdy enough.',4,'2023-07-09'),(101,20,8,'The product is excellent.',5,'2023-07-09'),(102,21,8,'The product is not what I expected.',2,'2023-07-09'),(104,22,8,'The product is disappointing.',1,'2023-07-09'),(105,23,8,'The product is excellent.',5,'2023-07-09'),(106,1,9,'The product is excellent.',5,'2023-07-09'),(107,12,9,'The product is excellent.',5,'2023-07-09'),(108,13,9,'The product is not what I expected.',2,'2023-07-09'),(109,14,9,'The product is just alright',3,'2023-07-09'),(110,15,9,'The product is seems sturdy enough.',4,'2023-07-09'),(111,16,9,'The product is disappointing.',1,'2023-07-09'),(112,17,9,'The product is not what I expected.',2,'2023-07-09'),(113,18,9,'The product is just alright',3,'2023-07-09'),(114,19,9,'The product is disappointing.',1,'2023-07-09'),(115,20,9,'The product is excellent.',5,'2023-07-09'),(116,21,9,'The product is seems sturdy enough.',4,'2023-07-09'),(117,22,9,'The product is just alright',3,'2023-07-09'),(118,23,9,'The product is excellent.',5,'2023-07-09'),(119,1,10,'The product is excellent.',5,'2023-07-09'),(120,12,10,'The product is excellent.',5,'2023-07-09'),(121,13,10,'The product is not what I expected.',2,'2023-07-09'),(122,14,10,'The product is just alright',3,'2023-07-09'),(123,15,10,'The product is seems sturdy enough.',4,'2023-07-09'),(124,16,10,'The product is disappointing.',1,'2023-07-09'),(125,17,10,'The product is not what I expected.',2,'2023-07-09'),(126,18,10,'The product is just alright',3,'2023-07-09'),(127,19,10,'The product is disappointing.',1,'2023-07-09'),(128,20,10,'The product is excellent.',5,'2023-07-09'),(129,21,10,'The product is seems sturdy enough.',4,'2023-07-09'),(130,22,10,'The product is just alright',3,'2023-07-09'),(131,23,10,'The product is excellent.',5,'2023-07-09'),(132,1,11,'The product is excellent.',5,'2023-07-09'),(133,12,11,'The product is excellent.',5,'2023-07-09'),(134,13,11,'The product is not what I expected.',2,'2023-07-09'),(135,14,11,'The product is just alright',3,'2023-07-09'),(136,15,11,'The product is seems sturdy enough.',4,'2023-07-09'),(137,16,11,'The product is disappointing.',1,'2023-07-09'),(138,17,11,'The product is not what I expected.',2,'2023-07-09'),(139,18,11,'The product is just alright',3,'2023-07-09'),(140,19,11,'The product is disappointing.',1,'2023-07-09'),(141,20,11,'The product is excellent.',5,'2023-07-09'),(142,21,11,'The product is seems sturdy enough.',4,'2023-07-09'),(143,22,11,'The product is just alright',3,'2023-07-09'),(144,23,11,'The product is excellent.',5,'2023-07-09'),(145,1,12,'The product is excellent.',5,'2023-07-09'),(146,12,12,'The product is excellent.',5,'2023-07-09'),(147,13,12,'The product is not what I expected.',2,'2023-07-09'),(148,14,12,'The product is just alright',3,'2023-07-09'),(149,15,12,'The product is seems sturdy enough.',4,'2023-07-09'),(150,16,12,'The product is disappointing.',1,'2023-07-09'),(151,17,12,'The product is not what I expected.',2,'2023-07-09'),(152,18,12,'The product is just alright',3,'2023-07-09'),(153,19,12,'The product is disappointing.',1,'2023-07-09'),(154,20,12,'The product is excellent.',5,'2023-07-09'),(155,21,12,'The product is seems sturdy enough.',4,'2023-07-09'),(156,22,12,'The product is just alright',3,'2023-07-09'),(157,23,12,'The product is excellent.',5,'2023-07-09'),(158,1,13,'The product is excellent.',5,'2023-07-09'),(159,12,13,'The product is excellent.',5,'2023-07-09'),(160,13,13,'The product is just alright',3,'2023-07-09'),(161,14,13,'The product is disappointing.',1,'2023-07-09'),(162,15,13,'The product is seems sturdy enough.',4,'2023-07-09'),(163,16,13,'The product is not what I expected.',2,'2023-07-09'),(164,17,13,'The product is excellent.',5,'2023-07-09'),(165,18,13,'The product is just alright',3,'2023-07-09'),(166,19,13,'The product is seems sturdy enough.',4,'2023-07-09'),(167,20,13,'The product is excellent.',5,'2023-07-09'),(168,21,13,'The product is not what I expected.',2,'2023-07-09'),(169,22,13,'The product is disappointing.',1,'2023-07-09'),(170,23,13,'The product is excellent.',5,'2023-07-09'),(171,1,14,'The product is excellent.',5,'2023-07-09'),(172,12,14,'The product is excellent.',5,'2023-07-09'),(173,13,14,'The product is not what I expected.',2,'2023-07-09'),(174,14,14,'The product is just alright',3,'2023-07-09'),(175,15,14,'The product is seems sturdy enough.',4,'2023-07-09'),(176,16,14,'The product is disappointing.',1,'2023-07-09'),(177,17,14,'The product is not what I expected.',2,'2023-07-09'),(178,18,14,'The product is just alright',3,'2023-07-09'),(179,19,14,'The product is disappointing.',1,'2023-07-09'),(180,20,14,'The product is excellent.',5,'2023-07-09'),(181,21,14,'The product is seems sturdy enough.',4,'2023-07-09'),(182,22,14,'The product is just alright',3,'2023-07-09'),(183,23,14,'The product is excellent.',5,'2023-07-09'),(184,1,15,'The product is excellent.',5,'2023-07-09'),(185,12,15,'The product is excellent.',5,'2023-07-09'),(186,13,15,'The product is just alright',3,'2023-07-09'),(187,14,15,'The product is disappointing.',1,'2023-07-09'),(188,15,15,'The product is seems sturdy enough.',4,'2023-07-09'),(189,16,15,'The product is not what I expected.',2,'2023-07-09'),(190,17,15,'The product is excellent.',5,'2023-07-09'),(191,18,15,'The product is just alright',3,'2023-07-09'),(192,19,15,'The product is seems sturdy enough.',4,'2023-07-09'),(193,20,15,'The product is excellent.',5,'2023-07-09'),(194,21,15,'The product is not what I expected.',2,'2023-07-09'),(195,22,15,'The product is disappointing.',1,'2023-07-09'),(196,23,15,'The product is excellent.',5,'2023-07-09'),(197,1,16,'The product is excellent.',5,'2023-07-09'),(198,12,16,'The product is excellent.',5,'2023-07-09'),(199,13,16,'The product is just alright',3,'2023-07-09'),(200,14,16,'The product is disappointing.',1,'2023-07-09'),(201,15,16,'The product is seems sturdy enough.',4,'2023-07-09'),(202,16,16,'The product is not what I expected.',2,'2023-07-09'),(203,17,16,'The product is excellent.',5,'2023-07-09'),(204,18,16,'The product is just alright',3,'2023-07-09'),(205,19,16,'The product is seems sturdy enough.',4,'2023-07-09'),(206,20,16,'The product is excellent.',5,'2023-07-09'),(207,21,16,'The product is not what I expected.',2,'2023-07-09'),(208,22,16,'The product is disappointing.',1,'2023-07-09'),(209,23,16,'The product is excellent.',5,'2023-07-09'),(210,1,17,'The product is excellent.',5,'2023-07-09'),(211,12,17,'The product is excellent.',5,'2023-07-09'),(212,13,17,'The product is not what I expected.',2,'2023-07-09'),(213,14,17,'The product is just alright',3,'2023-07-09'),(214,15,17,'The product is seems sturdy enough.',4,'2023-07-09'),(215,16,17,'The product is disappointing.',1,'2023-07-09'),(216,17,17,'The product is not what I expected.',2,'2023-07-09'),(217,18,17,'The product is just alright',3,'2023-07-09'),(218,19,17,'The product is disappointing.',1,'2023-07-09'),(219,20,17,'The product is excellent.',5,'2023-07-09'),(220,21,17,'The product is seems sturdy enough.',4,'2023-07-09'),(221,22,17,'The product is just alright',3,'2023-07-09'),(222,23,17,'The product is excellent.',5,'2023-07-09'),(223,1,18,'The product is excellent.',5,'2023-07-09'),(224,12,18,'The product is excellent.',5,'2023-07-09'),(225,13,18,'The product is just alright',3,'2023-07-09'),(226,14,18,'The product is disappointing.',1,'2023-07-09'),(227,15,18,'The product is seems sturdy enough.',4,'2023-07-09'),(228,16,18,'The product is not what I expected.',2,'2023-07-09'),(229,17,18,'The product is excellent.',5,'2023-07-09'),(230,18,18,'The product is just alright',3,'2023-07-09'),(231,19,18,'The product is seems sturdy enough.',4,'2023-07-09'),(232,20,18,'The product is excellent.',5,'2023-07-09'),(233,21,18,'The product is not what I expected.',2,'2023-07-09'),(234,22,18,'The product is disappointing.',1,'2023-07-09'),(235,23,18,'The product is excellent.',5,'2023-07-09'),(236,12,19,'The product is excellent.',5,'2023-07-09'),(237,13,19,'The product is just alright',3,'2023-07-09'),(238,14,19,'The product is disappointing.',1,'2023-07-09'),(239,15,19,'The product is seems sturdy enough.',4,'2023-07-09'),(240,16,19,'The product is not what I expected.',2,'2023-07-09'),(241,17,19,'The product is excellent.',5,'2023-07-09'),(242,18,19,'The product is just alright',3,'2023-07-09'),(243,19,19,'The product is seems sturdy enough.',4,'2023-07-09'),(244,20,19,'The product is excellent.',5,'2023-07-09'),(245,21,19,'The product is not what I expected.',2,'2023-07-09'),(246,22,19,'The product is disappointing.',1,'2023-07-09'),(247,23,19,'The product is excellent.',5,'2023-07-09'),(248,1,19,'The product is seems sturdy enough.',4,'2023-07-09'),(249,1,20,'The product is excellent.',5,'2023-07-09'),(250,12,20,'The product is excellent.',5,'2023-07-09'),(251,13,20,'The product is just alright',3,'2023-07-09'),(252,14,20,'The product is disappointing.',1,'2023-07-09'),(253,15,20,'The product is seems sturdy enough.',4,'2023-07-09'),(254,16,20,'The product is not what I expected.',2,'2023-07-09'),(255,17,20,'The product is excellent.',5,'2023-07-09'),(256,18,20,'The product is just alright',3,'2023-07-09'),(257,19,20,'The product is seems sturdy enough.',4,'2023-07-09'),(258,20,20,'The product is excellent.',5,'2023-07-09'),(259,21,20,'The product is not what I expected.',2,'2023-07-09'),(260,22,20,'The product is disappointing.',1,'2023-07-09'),(261,23,20,'The product is excellent.',5,'2023-07-09'),(262,1,21,'The product is excellent.',5,'2023-07-09'),(263,12,21,'The product is excellent.',5,'2023-07-09'),(264,13,21,'The product is not what I expected.',2,'2023-07-09'),(265,14,21,'The product is just alright',3,'2023-07-09'),(266,15,21,'The product is seems sturdy enough.',4,'2023-07-09'),(267,16,21,'The product is disappointing.',1,'2023-07-09'),(268,17,21,'The product is not what I expected.',2,'2023-07-09'),(269,18,21,'The product is just alright',3,'2023-07-09'),(270,19,21,'The product is disappointing.',1,'2023-07-09'),(271,20,21,'The product is excellent.',5,'2023-07-09'),(272,21,21,'The product is seems sturdy enough.',4,'2023-07-09'),(273,22,21,'The product is just alright',3,'2023-07-09'),(274,23,21,'The product is excellent.',5,'2023-07-09'),(275,1,22,'The product is excellent.',5,'2023-07-09'),(276,12,22,'The product is excellent.',5,'2023-07-09'),(277,13,22,'The product is not what I expected.',2,'2023-07-09'),(278,14,22,'The product is just alright',3,'2023-07-09'),(279,15,22,'The product is seems sturdy enough.',4,'2023-07-09'),(280,16,22,'The product is disappointing.',1,'2023-07-09'),(281,17,22,'The product is not what I expected.',2,'2023-07-09'),(282,18,22,'The product is just alright',3,'2023-07-09'),(283,19,22,'The product is disappointing.',1,'2023-07-09'),(284,20,22,'The product is excellent.',5,'2023-07-09'),(285,21,22,'The product is seems sturdy enough.',4,'2023-07-09'),(286,22,22,'The product is just alright',3,'2023-07-09'),(287,23,22,'The product is excellent.',5,'2023-07-09'),(289,1,23,'The product is excellent.',5,'2023-07-09'),(290,12,23,'The product is excellent.',5,'2023-07-09'),(291,13,23,'The product is not what I expected.',2,'2023-07-09'),(292,14,23,'The product is just alright',3,'2023-07-09'),(293,15,23,'The product is seems sturdy enough.',4,'2023-07-09'),(294,16,23,'The product is disappointing.',1,'2023-07-09'),(295,17,23,'The product is not what I expected.',2,'2023-07-09'),(296,18,23,'The product is just alright',3,'2023-07-09'),(297,19,23,'The product is disappointing.',1,'2023-07-09'),(298,20,23,'The product is excellent.',5,'2023-07-09'),(299,21,23,'The product is seems sturdy enough.',4,'2023-07-09'),(300,22,23,'The product is just alright',3,'2023-07-09'),(301,23,23,'The product is excellent.',5,'2023-07-09'),(302,1,24,'The product is excellent.',5,'2023-07-09'),(303,12,24,'The product is excellent.',5,'2023-07-09'),(304,13,24,'The product is not what I expected.',2,'2023-07-09'),(305,14,24,'The product is just alright',3,'2023-07-09'),(306,15,24,'The product is seems sturdy enough.',4,'2023-07-09'),(307,16,24,'The product is disappointing.',1,'2023-07-09'),(308,17,24,'The product is not what I expected.',2,'2023-07-09'),(309,18,24,'The product is just alright',3,'2023-07-09'),(310,19,24,'The product is disappointing.',1,'2023-07-09'),(311,20,24,'The product is excellent.',5,'2023-07-09'),(312,21,24,'The product is seems sturdy enough.',4,'2023-07-09'),(313,22,24,'The product is just alright',3,'2023-07-09'),(314,23,24,'The product is excellent.',5,'2023-07-09'),(315,1,25,'The product is excellent.',5,'2023-07-09'),(316,12,25,'The product is excellent.',5,'2023-07-09'),(317,13,25,'The product is not what I expected.',2,'2023-07-09'),(318,14,25,'The product is just alright',3,'2023-07-09'),(319,15,25,'The product is seems sturdy enough.',4,'2023-07-09'),(320,16,25,'The product is disappointing.',1,'2023-07-09'),(321,17,25,'The product is not what I expected.',2,'2023-07-09'),(322,18,25,'The product is just alright',3,'2023-07-09'),(323,19,25,'The product is disappointing.',1,'2023-07-09'),(324,20,25,'The product is excellent.',5,'2023-07-09'),(325,21,25,'The product is seems sturdy enough.',4,'2023-07-09'),(326,22,25,'The product is just alright',3,'2023-07-09'),(327,23,25,'The product is excellent.',5,'2023-07-09'),(328,1,26,'The product is excellent.',5,'2023-07-09'),(329,12,26,'The product is excellent.',5,'2023-07-09'),(330,13,26,'The product is not what I expected.',2,'2023-07-09'),(331,14,26,'The product is just alright',3,'2023-07-09'),(332,15,26,'The product is seems sturdy enough.',4,'2023-07-09'),(333,16,26,'The product is disappointing.',1,'2023-07-09'),(334,17,26,'The product is not what I expected.',2,'2023-07-09'),(335,18,26,'The product is just alright',3,'2023-07-09'),(336,19,26,'The product is disappointing.',1,'2023-07-09'),(337,20,26,'The product is excellent.',5,'2023-07-09'),(338,21,26,'The product is seems sturdy enough.',4,'2023-07-09'),(339,22,26,'The product is just alright',3,'2023-07-09'),(340,23,26,'The product is excellent.',5,'2023-07-09'),(341,1,27,'The product is excellent.',5,'2023-07-09'),(342,12,27,'The product is excellent.',5,'2023-07-09'),(343,13,27,'The product is not what I expected.',2,'2023-07-09'),(344,14,27,'The product is just alright',3,'2023-07-09'),(345,15,27,'The product is seems sturdy enough.',4,'2023-07-09'),(346,16,27,'The product is disappointing.',1,'2023-07-09'),(347,17,27,'The product is not what I expected.',2,'2023-07-09'),(348,18,27,'The product is just alright',3,'2023-07-09'),(349,19,27,'The product is disappointing.',1,'2023-07-09'),(350,20,27,'The product is excellent.',5,'2023-07-09'),(351,21,27,'The product is seems sturdy enough.',4,'2023-07-09'),(352,22,27,'The product is just alright',3,'2023-07-09'),(353,23,27,'The product is excellent.',5,'2023-07-09'),(354,1,28,'The product is excellent.',5,'2023-07-09'),(355,12,28,'The product is excellent.',5,'2023-07-09'),(356,13,28,'The product is not what I expected.',2,'2023-07-09'),(357,14,28,'The product is just alright',3,'2023-07-09'),(358,15,28,'The product is seems sturdy enough.',4,'2023-07-09'),(359,16,28,'The product is disappointing.',1,'2023-07-09'),(360,17,28,'The product is not what I expected.',2,'2023-07-09'),(361,18,28,'The product is just alright',3,'2023-07-09'),(362,19,28,'The product is disappointing.',1,'2023-07-09'),(363,20,28,'The product is excellent.',5,'2023-07-09'),(364,21,28,'The product is seems sturdy enough.',4,'2023-07-09'),(365,22,28,'The product is just alright',3,'2023-07-09'),(366,23,28,'The product is excellent.',5,'2023-07-09'),(367,1,29,'The product is excellent.',5,'2023-07-09'),(368,12,29,'The product is excellent.',5,'2023-07-09'),(369,13,29,'The product is not what I expected.',2,'2023-07-09'),(370,14,29,'The product is just alright',3,'2023-07-09'),(371,15,29,'The product is seems sturdy enough.',4,'2023-07-09'),(373,16,29,'The product is disappointing.',1,'2023-07-09'),(374,17,29,'The product is not what I expected.',2,'2023-07-09'),(375,18,29,'The product is just alright',3,'2023-07-09'),(376,19,29,'The product is disappointing.',1,'2023-07-09'),(377,20,29,'The product is excellent.',5,'2023-07-09'),(378,21,29,'The product is seems sturdy enough.',4,'2023-07-09'),(379,22,29,'The product is just alright',3,'2023-07-09'),(380,23,29,'The product is excellent.',5,'2023-07-09'),(381,1,30,'The product is excellent.',5,'2023-07-09'),(382,12,30,'The product is excellent.',5,'2023-07-09'),(383,13,30,'The product is not what I expected.',2,'2023-07-09'),(384,14,30,'The product is just alright',3,'2023-07-09'),(385,15,30,'The product is seems sturdy enough.',4,'2023-07-09'),(386,16,30,'The product is disappointing.',1,'2023-07-09'),(387,17,30,'The product is not what I expected.',2,'2023-07-09'),(388,18,30,'The product is just alright',3,'2023-07-09'),(389,19,30,'The product is disappointing.',1,'2023-07-09'),(390,20,30,'The product is excellent.',5,'2023-07-09'),(391,21,30,'The product is seems sturdy enough.',4,'2023-07-09'),(392,22,30,'The product is just alright',3,'2023-07-09'),(393,23,30,'The product is excellent.',5,'2023-07-09'),(394,12,50,'Awesome Item! will buy again',5,'2023-07-10'),(395,12,50,'Cool lanyard! Will recommend',5,'2023-07-10'),(396,12,50,'Cool',5,'2023-07-10'),(397,12,50,'Cool Lanyard',5,'2023-07-10'),(398,12,51,'Amazing!',5,'2023-07-10'),(399,12,51,'Nyle abot nga nyle',1,'2023-07-10'),(400,12,50,'Amazing!',5,'2023-07-10');
/*!40000 ALTER TABLE `product_feedback` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `prod_id` int NOT NULL AUTO_INCREMENT,
  `shop_id` int NOT NULL,
  `prod_name` varchar(255) NOT NULL,
  `prod_desc` mediumtext NOT NULL,
  `prod_price` decimal(10,2) NOT NULL,
  `prod_stocks` int NOT NULL,
  PRIMARY KEY (`prod_id`),
  KEY `fk_products_shop_info1_idx` (`shop_id`),
  CONSTRAINT `fk_products_shop_info1` FOREIGN KEY (`shop_id`) REFERENCES `shop_info` (`shop_id`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,2,'TUP CES - T Shirt','Get ready to conquer the rest of the school year with this year’s awesome merch including tote bags and lanyard. We hope to CE you around wearing this awesome merch! ',349.00,100),(2,2,'TUP CES - Lanyard','Get ready to conquer the rest of the school year with this year’s awesome merch including tote bags and lanyard. We hope to CE you around wearing this awesome merch! ',130.00,99),(3,2,'TUP CES - Tote Bag','Get ready to conquer the rest of the school year with this year’s awesome merch including tote bags and lanyard. We hope to CE you around wearing this awesome merch! ',199.00,100),(4,2,'TUP CES - Merch Bundle','Get ready to conquer the rest of the school year with this year’s awesome merch including tote bags and lanyard. We hope to CE you around wearing this awesome merch! ',499.00,100),(5,3,'TUP CIT - Haliging Bayan T Shirt','CITians! Are you already feeling the beginning of the new era of different styles and elegance? The official CITians Resurgence merchandise designs is finally here! ',450.00,100),(6,3,'TUP CIT - Tote Bag','CITians! Are you already feeling the beginning of the new era of different styles and elegance? The official CITians Resurgence merchandise designs is finally here! ',150.00,100),(7,3,'TUP CIT - Lanyard','CITians! Are you already feeling the beginning of the new era of different styles and elegance? The official CITians Resurgence merchandise designs is finally here! ',100.00,100),(8,3,'TUP CIT - HIRAYA T Shirt','CITians! Are you already feeling the beginning of the new era of different styles and elegance? The official CITians Resurgence merchandise designs is finally here! ',450.00,100),(9,3,'TUP CIT - CIT T Shirt','CITians! Are you already feeling the beginning of the new era of different styles and elegance? The official CITians Resurgence merchandise designs is finally here! ',450.00,100),(10,3,'TUP CIT - BAYBAY T Shirt','CITians! Are you already feeling the beginning of the new era of different styles and elegance? The official CITians Resurgence merchandise designs is finally here! ',450.00,100),(11,3,'TUP CIT - CITians Pin','CITians! Are you already feeling the beginning of the new era of different styles and elegance? The official CITians Resurgence merchandise designs is finally here! ',75.00,100),(12,4,'TUP COE - Polo Shirt','Wear these items with pride and represent the greatness of College of Engineering! Whether you\'re attending classes, hitting the streets, or chilling at home, our merch will keep the burning Engineering passion within you.',519.00,100),(13,4,'TUP COE - T Shirt','Wear these items with pride and represent the greatness of College of Engineering! Whether you\'re attending classes, hitting the streets, or chilling at home, our merch will keep the burning Engineering passion within you.',298.00,100),(14,4,'TUP COE - BUNDLE A','Wear these items with pride and represent the greatness of College of Engineering! Whether you\'re attending classes, hitting the streets, or chilling at home, our merch will keep the burning Engineering passion within you.',197.00,99),(15,4,'TUP COE - BUNDLE C','Wear these items with pride and represent the greatness of College of Engineering! Whether you\'re attending classes, hitting the streets, or chilling at home, our merch will keep the burning Engineering passion within you.',466.00,98),(16,4,'TUP COE - Dri-Fit ','Wear these items with pride and represent the greatness of College of Engineering! Whether you\'re attending classes, hitting the streets, or chilling at home, our merch will keep the burning Engineering passion within you.',549.00,100),(17,4,'TUP COE - BUNDLE D','Wear these items with pride and represent the greatness of College of Engineering! Whether you\'re attending classes, hitting the streets, or chilling at home, our merch will keep the burning Engineering passion within you.',663.00,100),(18,4,'TUP COE - Tote Bag','Wear these items with pride and represent the greatness of College of Engineering! Whether you\'re attending classes, hitting the streets, or chilling at home, our merch will keep the burning Engineering passion within you.',119.00,100),(19,4,'TUP COE - Lanyard','Wear these items with pride and represent the greatness of College of Engineering! Whether you\'re attending classes, hitting the streets, or chilling at home, our merch will keep the burning Engineering passion within you.',99.00,100),(20,4,'TUP COE - BUNDLE E','Wear these items with pride and represent the greatness of College of Engineering! Whether you\'re attending classes, hitting the streets, or chilling at home, our merch will keep the burning Engineering passion within you.',1427.00,100),(21,4,'TUP COE - BUNDLE B','Wear these items with pride and represent the greatness of College of Engineering! Whether you\'re attending classes, hitting the streets, or chilling at home, our merch will keep the burning Engineering passion within you.',691.00,100),(22,5,'TUP COS - Polo Shirt','Finals are prolonged, so is the agony of making it through, but you want something fresh and exciting ba!? Weeeell, don\'t worry coz we gotchu naman! Here\'s a prize for finishing the semester.',349.00,100),(23,5,'TUP COS - AGHAM T Shirt','Finals are prolonged, so is the agony of making it through, but you want something fresh and exciting ba!? Weeeell, don\'t worry coz we gotchu naman! Here\'s a prize for finishing the semester',199.00,100),(24,5,'TUP COS - Lanyard','Finals are prolonged, so is the agony of making it through, but you want something fresh and exciting ba!? Weeeell, don\'t worry coz we gotchu naman! Here\'s a prize for finishing the semester',110.00,100),(25,5,'TUP COS - TOTE MARIE AGHAM Bundle','Finals are prolonged, so is the agony of making it through, but you want something fresh and exciting ba!? Weeeell, don\'t worry coz we gotchu naman! Here\'s a prize for finishing the semester',369.00,100),(26,5,'TUP COS - ISTETIK AGHAM BUNDLE Bundle','Finals are prolonged, so is the agony of making it through, but you want something fresh and exciting ba!? Weeeell, don\'t worry coz we gotchu naman! Here\'s a prize for finishing the semester',441.00,100),(27,5,'TUP COS - 1901 Tote Bag','Finals are prolonged, so is the agony of making it through, but you want something fresh and exciting ba!? Weeeell, don\'t worry coz we gotchu naman! Here\'s a prize for finishing the semester',189.00,100),(28,5,'TUP COS - D` POWERHOUSE Shirt','Finals are prolonged, so is the agony of making it through, but you want something fresh and exciting ba!? Weeeell, don\'t worry coz we gotchu naman! Here\'s a prize for finishing the semester',259.00,100),(29,5,'TUP COS - COSIAN AGHAM Bundle','Finals are prolonged, so is the agony of making it through, but you want something fresh and exciting ba!? Weeeell, don\'t worry coz we gotchu naman! Here\'s a prize for finishing the semester',404.00,100),(30,5,'TUP COS - TATAK COSIAN Pin','Finals are prolonged, so is the agony of making it through, but you want something fresh and exciting ba!? Weeeell, don\'t worry coz we gotchu naman! Here\'s a prize for finishing the semester',25.00,100),(31,6,'TUP EES - Button Pins','Join the TUPEES revolution and rock our exclusive merch like a true trendsetter! Unleash your inner style with the hottest fashion pieces that\'ll make heads turn. Get your hands on TUPEES Selling Merch and elevate your wardrobe to the next level. It\'s time to embrace the passion and make a statement with every step you take.',59.00,100),(32,6,'TUP EES - T Shirt','Join the TUPEES revolution and rock our exclusive merch like a true trendsetter! Unleash your inner style with the hottest fashion pieces that\'ll make heads turn. Get your hands on TUPEES Selling Merch and elevate your wardrobe to the next level. It\'s time to embrace the passion and make a statement with every step you take.',350.00,100),(33,6,'TUP EES - Tote Bag','Join the TUPEES revolution and rock our exclusive merch like a true trendsetter! Unleash your inner style with the hottest fashion pieces that\'ll make heads turn. Get your hands on TUPEES Selling Merch and elevate your wardrobe to the next level. It\'s time to embrace the passion and make a statement with every step you take.',180.00,100),(34,6,'TUP EES - ULTIMATE BUNDLE #1','Join the TUPEES revolution and rock our exclusive merch like a true trendsetter! Unleash your inner style with the hottest fashion pieces that\'ll make heads turn. Get your hands on TUPEES Selling Merch and elevate your wardrobe to the next level. It\'s time to embrace the passion and make a statement with every step you take.',1029.00,100),(35,6,'TUP EES - Lanyard','Join the TUPEES revolution and rock our exclusive merch like a true trendsetter! Unleash your inner style with the hottest fashion pieces that\'ll make heads turn. Get your hands on TUPEES Selling Merch and elevate your wardrobe to the next level. It\'s time to embrace the passion and make a statement with every step you take.',150.00,100),(36,6,'TUP EES - ULTIMATE BUNDLE #3','Join the TUPEES revolution and rock our exclusive merch like a true trendsetter! Unleash your inner style with the hottest fashion pieces that\'ll make heads turn. Get your hands on TUPEES Selling Merch and elevate your wardrobe to the next level. It\'s time to embrace the passion and make a statement with every step you take.',564.00,100),(37,6,'TUP EES - ULTIMATE BUNDLE #2','Join the TUPEES revolution and rock our exclusive merch like a true trendsetter! Unleash your inner style with the hottest fashion pieces that\'ll make heads turn. Get your hands on TUPEES Selling Merch and elevate your wardrobe to the next level. It\'s time to embrace the passion and make a statement with every step you take.',634.00,100),(38,6,'TUP EES - ULTIMATE BUNDLE #4','Join the TUPEES revolution and rock our exclusive merch like a true trendsetter! Unleash your inner style with the hottest fashion pieces that\'ll make heads turn. Get your hands on TUPEES Selling Merch and elevate your wardrobe to the next level. It\'s time to embrace the passion and make a statement with every step you take.',489.00,100),(39,6,'TUP EES - EE Polo Shirt','Join the TUPEES revolution and rock our exclusive merch like a true trendsetter! Unleash your inner style with the hottest fashion pieces that\'ll make heads turn. Get your hands on TUPEES Selling Merch and elevate your wardrobe to the next level. It\'s time to embrace the passion and make a statement with every step you take.',450.00,100),(40,7,'TUP GDSC - T Shirt','Taste the Red-red-red flavour while beating the summer heat in style! Face the heat fresh with this newly released merch!',250.00,100),(41,8,'GEAR - GEARHAWKS JERSEY','No need to clutch and say \'Kaya pa \'to late game bro\' since TUP GEAR\'s Official Merchandise selling is now EXTENDED! Merchandise Pre-orders will now end on MAY 30TH!',750.00,100),(42,8,'GEAR - Bundles 1','No need to clutch and say \'Kaya pa \'to late game bro\' since TUP GEAR\'s Official Merchandise selling is now EXTENDED! Merchandise Pre-orders will now end on MAY 30TH!',825.00,100),(43,8,'GEAR - Lanyard','No need to clutch and say \'Kaya pa \'to late game bro\' since TUP GEAR\'s Official Merchandise selling is now EXTENDED! Merchandise Pre-orders will now end on MAY 30TH!',150.00,100),(44,8,'GEAR - T\'EES','No need to clutch and say \'Kaya pa \'to late game bro\' since TUP GEAR\'s Official Merchandise selling is now EXTENDED! Merchandise Pre-orders will now end on MAY 30TH!',450.00,100),(45,8,'GEAR - Bundle 4','No need to clutch and say \'Kaya pa \'to late game bro\' since TUP GEAR\'s Official Merchandise selling is now EXTENDED! Merchandise Pre-orders will now end on MAY 30TH!',1150.00,100),(46,8,'GEAR - Bundles 2','No need to clutch and say \'Kaya pa \'to late game bro\' since TUP GEAR\'s Official Merchandise selling is now EXTENDED! Merchandise Pre-orders will now end on MAY 30TH!',550.00,100),(47,9,'TUP ISET - DAGISIKAN Beep Card Sticker','The Innovative Society for Electronics Technologists is excited to present its merch-line, named as Dagisikan Technology Merchandise composed by its very own Dagasikan\'s shirt, lanyard, and beep card. The main objective of this project is to promote TUPians\' original and creative concepts. Each product in our collection has been meticulously created and designed. ',50.00,100),(48,9,'TUP ISET - T Shirt','The Innovative Society for Electronics Technologists is excited to present its merch-line, named as Dagisikan Technology Merchandise composed by its very own Dagasikan\'s shirt, lanyard, and beep card. The main objective of this project is to promote TUPians\' original and creative concepts. Each product in our collection has been meticulously created and designed. ',300.00,100),(49,9,'TUP ISET - DAGISIKAN Lanyard','The Innovative Society for Electronics Technologists is excited to present its merch-line, named as Dagisikan Technology Merchandise composed by its very own Dagasikan\'s shirt, lanyard, and beep card. The main objective of this project is to promote TUPians\' original and creative concepts. Each product in our collection has been meticulously created and designed. ',120.00,100),(50,10,'Tech Guild - Ablaze T shirt','PANGMALAKASANG MERCH BA ANG HANAP MO?!  ETO NA YON! NANGGIGIGIL AKO SAYO!!',350.00,100),(51,10,'Tech Guild - Ablaze Lanyard','PANGMALAKASANG MERCH BA ANG HANAP MO?!  ETO NA YON! NANGGIGIGIL AKO SAYO!!',75.00,100),(52,11,'TUP USG - Lanyard @117','The TUP-USG is now selling U-chandise! University shirts, polo shirts and lanyards.\n Be the first one to have this limited edition merchandise and have the chance to win amazing prizes through raffle draw. Pre ordering will start on October 15,2018 by 9:00 am to 5:00 pm from Mondays to Fridays.',100.00,100),(53,11,'TUP USG - T Shirt','The TUP-USG is now selling U-chandise! University shirts, polo shirts and lanyards.\n Be the first one to have this limited edition merchandise and have the chance to win amazing prizes through raffle draw. Pre ordering will start on October 15,2018 by 9:00 am to 5:00 pm from Mondays to Fridays.',200.00,100),(54,11,'TUP USG - University Polo Shirt','The TUP-USG is now selling U-chandise! University shirts, polo shirts and lanyards.\n Be the first one to have this limited edition merchandise and have the chance to win amazing prizes through raffle draw. Pre ordering will start on October 15,2018 by 9:00 am to 5:00 pm from Mondays to Fridays.',360.00,100),(55,11,'TUP USG - MARIKIT Polo Shirt','The TUP-USG is now selling U-chandise! University shirts, polo shirts and lanyards.\n Be the first one to have this limited edition merchandise and have the chance to win amazing prizes through raffle draw. Pre ordering will start on October 15,2018 by 9:00 am to 5:00 pm from Mondays to Fridays.',390.00,100),(56,11,'TUP USG - Tote Bag','The TUP-USG is now selling U-chandise! University shirts, polo shirts and lanyards.\n Be the first one to have this limited edition merchandise and have the chance to win amazing prizes through raffle draw. Pre ordering will start on October 15,2018 by 9:00 am to 5:00 pm from Mondays to Fridays.',175.00,100),(57,12,'TUP ORG 1 Shirt','This is a shirt',350.00,10),(59,14,'VALERON SHIRT','EXCLUSIVE PREMIUM SHIRT.',500.00,10);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shop_info`
--

DROP TABLE IF EXISTS `shop_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shop_info` (
  `shop_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `shop_name` varchar(255) NOT NULL,
  `shop_desc` mediumtext NOT NULL,
  `shop_phone` char(11) NOT NULL,
  `shop_logo` varchar(255) DEFAULT NULL,
  `shop_banner` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`shop_id`),
  KEY `fk_shop_info_user_details1_idx` (`user_id`),
  CONSTRAINT `fk_shop_info_user_details1` FOREIGN KEY (`user_id`) REFERENCES `user_details` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shop_info`
--

LOCK TABLES `shop_info` WRITE;
/*!40000 ALTER TABLE `shop_info` DISABLE KEYS */;
INSERT INTO `shop_info` VALUES (2,2,'TUP CES','The official civil engineering student organization, under JPICE-LNM and ACIP-CSL, of TUP Manila.','09123456789','https://res.cloudinary.com/dxsdudkfz/image/upload/v1688890901/logo/ir0qha1r7su4s6apr5dw.jpg','https://res.cloudinary.com/dxsdudkfz/image/upload/v1688890903/banner/okyxa9sqjlp8zpyznl0b.jpg'),(3,3,'TUP CIT','WELCOME to the Official Facebook Page of the TUP Manila - College of Industrial Technology - Master','09123456789','https://res.cloudinary.com/dxsdudkfz/image/upload/v1688891961/logo/bdxawx255xzondsjsu6w.jpg','https://res.cloudinary.com/dxsdudkfz/image/upload/v1688891965/banner/thguk1tog8lbz4fyysyx.jpg'),(4,4,'TUP COE','Every new academic year is a blessing as you progress in learning and stepping ahead in life finding new ways and methods to make life better for the future. Let us start our new year at school with hopes and dreams that no matter how limited we might be, we will do our best to achieve what we call dreams. Also, it is something magical about success.','09123456789','https://res.cloudinary.com/dxsdudkfz/image/upload/v1688892113/logo/iid9ikdgqhfynvjpidbz.jpg','https://res.cloudinary.com/dxsdudkfz/image/upload/v1688892115/banner/sva7ckubvmbbdvjetrlw.jpg'),(5,5,'TUP COS','As we approach the second semester of AY 2022-2023, the TUP-Manila College of Science Student Council intends to provide excellent service which every TUPians deserve.','09123456789','https://res.cloudinary.com/dxsdudkfz/image/upload/v1688895278/logo/youncfngkllchvxpbts6.jpg','https://res.cloudinary.com/dxsdudkfz/image/upload/v1688895282/banner/e9etnzrosblsu2onvvtr.png'),(6,6,'TUP EES','The Official Electrical Engineering Students Organization of TUP - Manila','09123456789','https://res.cloudinary.com/dxsdudkfz/image/upload/v1688895876/logo/x2fbskp2ikrzlygllhtj.jpg','https://res.cloudinary.com/dxsdudkfz/image/upload/v1688895878/banner/bsoqvov0scwiho9fp6b8.jpg'),(7,7,'TUP GDSC','Google Developer Student Clubs TUP Manila is a Google Developers Program that helps students','09123456789','https://res.cloudinary.com/dxsdudkfz/image/upload/v1688896698/logo/gql0pzrwmhvooivnrosu.png','https://res.cloudinary.com/dxsdudkfz/image/upload/v1688896701/banner/he2n9d7kcnxkxnfgoga6.png'),(8,8,'TUP GEAR','The Leading Student Organization for Campus Esports & Gaming in Technological University of the Phil.','09123456789','https://res.cloudinary.com/dxsdudkfz/image/upload/v1688896946/logo/gnp1u38dzzwc7nrcxpph.jpg','https://res.cloudinary.com/dxsdudkfz/image/upload/v1688896948/banner/iak2d1jevvki2yinbswg.png'),(9,9,'TUP ISET','As we enter another semester for this school year, may we continue to strive harder and do our very best for our future careers.\nThe Innovative Society for Electronics Technologists will hereby continue to provide a space for students to help them engage with academic and extracurricular interests. Through working together to create the most iSETacular experience for all.','09123456789','https://res.cloudinary.com/dxsdudkfz/image/upload/v1688897546/logo/nwez5shuuxclqjzjs0zu.jpg','https://res.cloudinary.com/dxsdudkfz/image/upload/v1688897548/banner/lzuwr1j4lfyal8elmelq.jpg'),(10,10,'TUP TECH GUILD','Tech Guild is a non-profit organization based of Technological University of the Philippines - Manila','09123456789','https://res.cloudinary.com/dxsdudkfz/image/upload/v1688897949/logo/pn92ssipciq2hm6ymxub.jpg','https://res.cloudinary.com/dxsdudkfz/image/upload/v1688899022/banner/xfnhq2paw3d8la5a2qgg.png'),(11,11,'TUP USG','This is the official page of the TUP - Manila, University Student Government','09123456789','https://res.cloudinary.com/dxsdudkfz/image/upload/v1688898276/logo/cfvuf0xq2gwjgp8dmcjw.jpg','https://res.cloudinary.com/dxsdudkfz/image/upload/v1688898278/banner/hfbeol8aa2clxwzzdtkv.jpg'),(12,25,'TUP ORG 1','This is the TUP ORG 1','09123456789','https://res.cloudinary.com/dxsdudkfz/image/upload/v1688952795/logo/jy9adels3xxao7bvpbb8.jpg','https://res.cloudinary.com/dxsdudkfz/image/upload/v1688952807/banner/gkkcjrl3aejjczijaqgk.png'),(13,25,'TUP ORG 1','This is the TUP ORG 1','09123456789','https://res.cloudinary.com/dxsdudkfz/image/upload/v1688952795/logo/jy9adels3xxao7bvpbb8.jpg','https://res.cloudinary.com/dxsdudkfz/image/upload/v1688952807/banner/gkkcjrl3aejjczijaqgk.png'),(14,28,'Valeron','','09175670063','https://res.cloudinary.com/dxsdudkfz/image/upload/v1689072543/logo/vaxrlxf2o82sjvimkvvf.jpg','https://res.cloudinary.com/dxsdudkfz/image/upload/v1689072546/banner/nogcbshnrcjbiih4tv3k.png'),(15,28,'Valeron','hehe','09175670063','https://res.cloudinary.com/dxsdudkfz/image/upload/v1689072543/logo/vaxrlxf2o82sjvimkvvf.jpg','https://res.cloudinary.com/dxsdudkfz/image/upload/v1689072546/banner/nogcbshnrcjbiih4tv3k.png');
/*!40000 ALTER TABLE `shop_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_address`
--

DROP TABLE IF EXISTS `user_address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_address` (
  `address_id` int NOT NULL AUTO_INCREMENT,
  `fullName` varchar(45) DEFAULT NULL,
  `phoneNumber` char(11) DEFAULT NULL,
  `address_line` varchar(255) NOT NULL,
  `brgy` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `province` varchar(255) NOT NULL,
  `region` varchar(255) NOT NULL,
  `default` varchar(45) DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`address_id`),
  KEY `fk_user_address_user_details1_idx` (`user_id`),
  CONSTRAINT `fk_user_address_user_details1` FOREIGN KEY (`user_id`) REFERENCES `user_details` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_address`
--

LOCK TABLES `user_address` WRITE;
/*!40000 ALTER TABLE `user_address` DISABLE KEYS */;
INSERT INTO `user_address` VALUES (1,'','','','','','','','',1),(2,NULL,'','Otso De Mayo','Barangay 15','Pasay City','Ncr, Fourth District','National Capital Region (NCR)','',3),(3,'','','','','','','','',10),(4,'Andrei Nuguid','0921708948','Violago','Payatas','Quezon City','Ncr, Second District','National Capital Region (NCR)','default',12),(5,'','','Otso De Mayo','Barangay 4','Pasay City','Ncr, Fourth District','National Capital Region (NCR)','',25);
/*!40000 ALTER TABLE `user_address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_credentials`
--

DROP TABLE IF EXISTS `user_credentials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_credentials` (
  `user_id` int NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` text NOT NULL,
  `user_type` enum('seller','customer','admin') NOT NULL,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `fk_user_credentials_user_details1` FOREIGN KEY (`user_id`) REFERENCES `user_details` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_credentials`
--

LOCK TABLES `user_credentials` WRITE;
/*!40000 ALTER TABLE `user_credentials` DISABLE KEYS */;
INSERT INTO `user_credentials` VALUES (1,'russell.obsequio@tup.edu.ph','$2a$10$mOPEfBQm7m4pH8DToOoyoegAnHH2zLLRudsSr3l5/Z6Fonw5ZHZbW','customer'),(2,'tup.ces@tup.edu.ph','$2a$10$2KnwyQfmP4C/gz3s15GTuOCzszYop1A01qYBCEjNdyTra1v8oT/u6','seller'),(3,'tup.cit@tup.edu.ph','$2a$10$Hp0lSgidHGxKEzdUpzD01uyUPA1g8r78nwJIbLhAexKAV63HTVe2K','seller'),(4,'tup.coe@tup.edu.ph','$2a$10$E7O7egUbKVZKV90lmWzk0e6WzfzgvpLiJ59Ha.sCh/k.ICjUFkXHq','seller'),(5,'tup.cos@tup.edu.ph','$2a$10$zdRFOuhy.rBlU0gyYfZpEOy4JDApttrmyKTjGUEGFyQZI4SqdGFte','seller'),(6,'tup.ees@tup.edu.ph','$2a$10$Ghgv8/M.lJQbrEkCG8kj.uoGQc6lk4X74kljbUhyMOLYHzbaBe9h2','seller'),(7,'tup.gdsc@tup.edu.ph','$2a$10$k9J5paIzme.CzWaN4qhgzeltVNC9pZZnCUmP072oQGpp3DeczUDcW','seller'),(8,'tup.gear@tup.edu.ph','$2a$10$de9VlOoQt8m/.FbOWRVQjOD2VF0qQwofWBhE7AcmpKxARuwXGWXXC','seller'),(9,'tup.iset@tup.edu.ph','$2a$10$JmnL.z506Qxdx27i.3DHsOkoD1dvxRvEWUTCPfkRw/X5H1i2nfH8C','seller'),(10,'tup.tg@tup.edu.ph','$2a$10$rtARweKS3/alBb2q/JxoceDWOHfMtQ0XKCRvRD8UL0p4687YFUQwq','seller'),(11,'tup.usg@tup.edu.ph','$2a$10$eyd4rVwNYR8ecmhmpNm.aeupkkNCnCA1pszhAtEZSRKIEwQDu/K/a','seller'),(12,'andrei.nuguid@tup.edu.ph','$2a$10$kFaDI0.PwljYTegC5CvwYekOyO7Y8O1tArUMaY2oYrwFYFDzP2B6.','customer'),(13,'nylelorenz.chua@tup.edu.ph','$2a$10$PM2K7uf8wAlRS7IrGpd64eQqtNOzFqsStDdrDdiIBAHRcOuhf/boa','customer'),(14,'rimeljohn.batallones@tup.edu.ph','$2a$10$NcKAwS4UPFI9BwoO8Nw95.68txVOXM6dm/6C.qPI0/DNTpZvNXJrW','customer'),(15,'francisco.panganiban@tup.edu.ph','$2a$10$ntnx.TurjVd3f8IuUArzfOuvIJiygwlQEIKYmrgiqXfv7K9fi1bku','customer'),(16,'rafhaelvien.sacdalan@tup.edu.ph','$2a$10$9I3ROvu6su5t96mKrVFoFu544o//H5BZDQnHiyoF057nQSzx0IW7W','customer'),(17,'micklareangelo.zepeda@tup.edu.ph','$2a$10$yBiCHmvTaRF/TZFp9mj2X.xKapMSGHSM6g38N6HkKvADl4LFy1mDi','customer'),(18,'jonathan.florencio@tup.edu.ph','$2a$10$uCgYHLq6hsZhvmy/chXeVeCIucgdHp8gmXLuY5XM8c0G6u60HzOg.','customer'),(19,'johnrollyver.espinosa@tup.edu.ph','$2a$10$64rr8Uyu9jfpoyYO.PMohO0pIdM.NwPn8PYvVyk97x/8UgpAS8OkC','customer'),(20,'christian.arales@tup.edu.ph','$2a$10$MvdM.2emGCRBP.lJcbiNZ.Rjx9o23W14K0cuPmgk0U.VRaBDgR6cu','customer'),(21,'janinerose.lingo@tup.edu.ph','$2a$10$hQW/KM/L.kmT2gmO.bKxduZdtd6kiM7grTE2CeJb8q/6lRJBKU0Nu','customer'),(22,'markjohnzell.unabia@tup.edu.ph','$2a$10$GPMdcaSt9LMNYE8U1cxsNudsMdh1JZX7IFsBAEaa8UAx6gzwlk1hK','customer'),(23,'carlosdaniel.prado@tup.edu.ph','$2a$10$1GsyiODloe010ELdAUGl0uR42Z0lpbcX13PLkDi5P61jUYRU1aXR6','customer'),(25,'xxstopxx25@gmail.com','$2a$10$Z8bAGHWb9VCLTR2X8htax.lXLUZv8CbLFPqyLTe41zqNTJoTXhq1i','seller'),(26,'usg@tup.edu.ph','$2a$10$Gl9/DwXXLcuKFix2DDpg4OYIG.BV3N6O39H1rrwClavPIrdUEClG.','admin'),(28,'nyle.chua05@gmail.com','$2a$10$qBNkm1MpQvYZ6r3MHSOsOe6Z12/VIVJVV2j.yy58Jr1Mq470blZT.','seller'),(29,'xlrevan.451lx@gmail.com','$2a$10$QdgEA4ZqMh014gCSFOjUQegFacTmpA1HSG.Z.NjlqFNovB4SHrhk2','admin');
/*!40000 ALTER TABLE `user_credentials` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_details`
--

DROP TABLE IF EXISTS `user_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_details` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(65) NOT NULL,
  `lastname` varchar(65) NOT NULL,
  `number` char(11) NOT NULL,
  `birthday` date NOT NULL,
  `age` int NOT NULL,
  `picture` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb3 KEY_BLOCK_SIZE=16;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_details`
--

LOCK TABLES `user_details` WRITE;
/*!40000 ALTER TABLE `user_details` DISABLE KEYS */;
INSERT INTO `user_details` VALUES (1,'Russell','Obsequio','09937132449','2001-11-05',21,NULL),(2,'TUP','CES','09123456789','2001-01-01',22,NULL),(3,'TUP','CIT','09123456789','2001-01-01',22,NULL),(4,'TUP','COE','09123456789','2001-01-01',22,NULL),(5,'TUP','COS','09123456789','2001-01-01',22,NULL),(6,'TUP','EES','09123456789','2001-01-01',22,NULL),(7,'TUP','GDSC','09123456789','2001-01-01',22,NULL),(8,'TUP','GEAR','09123456789','2001-01-01',22,NULL),(9,'TUP','ISET','09123456789','2001-01-01',22,NULL),(10,'TUP','TG','0912345689','2000-12-31',22,'https://res.cloudinary.com/dxsdudkfz/image/upload/v1688966133/users/slu98ypti0fop9fedjia.jpg'),(11,'TUP','USG','09123456789','2001-01-01',22,NULL),(12,'Andrei','Nuguid','0921708948','2001-05-27',22,'https://res.cloudinary.com/dxsdudkfz/image/upload/v1688952442/users/of3ra91eoh9nzg4grrhp.png'),(13,'Nyle Lorenz','Chua','09123456789','2001-04-05',22,NULL),(14,'Rimel John','Batallones','09123456789','2001-04-09',22,NULL),(15,'Francisco','Panganiban','09123456789','2001-07-25',21,NULL),(16,'Rafhael Vien','Sacdalan','09123456789','2001-01-01',22,NULL),(17,'Micklare Angelo','Zepeda','09123456789','2001-01-01',22,NULL),(18,'Jonathan','Florencio','09123456789','2001-01-01',22,NULL),(19,'Jhon Rollyver','Espinosa','09123456789','2001-02-01',22,NULL),(20,'Christian','Arales','09123456789','2001-01-01',22,NULL),(21,'Janine Rose','Lingo','09123456789','2001-01-01',22,NULL),(22,'Mark Johnzell','Unabia','09123456789','2001-02-01',22,NULL),(23,'Carlos Denielle','Prado','09123456789','2000-12-31',22,NULL),(25,'Dwayne','Olivares','09123456789','2000-12-31',22,'https://res.cloudinary.com/dxsdudkfz/image/upload/v1688952827/users/on4loieqpo4wjc42swal.jpg'),(26,'USG','Manila','09937132449','2001-05-11',22,NULL),(27,'Nyle','Chua','09175670063','2001-04-05',22,NULL),(28,'Cath','Velasquez','09175670063','2001-04-05',22,NULL),(29,'Cath','Velasquez','09175670063','2001-05-04',22,NULL);
/*!40000 ALTER TABLE `user_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_forgot_pass`
--

DROP TABLE IF EXISTS `user_forgot_pass`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_forgot_pass` (
  `forgot_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `code` char(6) NOT NULL,
  `date` datetime NOT NULL,
  PRIMARY KEY (`forgot_id`),
  KEY `fk_user_forgot_pass_user_details1_idx` (`user_id`),
  CONSTRAINT `fk_user_forgot_pass_user_details1` FOREIGN KEY (`user_id`) REFERENCES `user_details` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_forgot_pass`
--

LOCK TABLES `user_forgot_pass` WRITE;
/*!40000 ALTER TABLE `user_forgot_pass` DISABLE KEYS */;
INSERT INTO `user_forgot_pass` VALUES (1,12,'248579','2023-07-10 13:06:05'),(2,13,'346160','2023-07-11 18:56:44');
/*!40000 ALTER TABLE `user_forgot_pass` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-07-11 21:36:21
