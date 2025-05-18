-- MariaDB dump 10.19  Distrib 10.4.32-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: argane_maroc
-- ------------------------------------------------------
-- Server version	10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admins` (
  `id_admin` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) NOT NULL,
  `prenom` varchar(20) NOT NULL,
  `email` varchar(100) NOT NULL,
  `mot_de_passe` varchar(255) NOT NULL,
  `role` varchar(50) DEFAULT 'admin',
  `permissions` text DEFAULT NULL,
  `date_creation` timestamp NOT NULL DEFAULT current_timestamp(),
  `actif` tinyint(1) DEFAULT 1,
  `numero_telephone` int(20) DEFAULT NULL,
  PRIMARY KEY (`id_admin`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
INSERT INTO `admins` VALUES (1,'es-safryouy','saad','mazozisaad@gmail.com','$2y$10$QBknJqIW9vdBQeIHZI2qCOTJKnMX/N1lkBAKFzuAijmsfp/0ggRLa','admin','data analysist','2024-12-18 14:44:04',1,644796181),(3,'Rmaily','Othman','otmanermaili@gmail.com','$2y$10$wPV/0s2H6VTVpbDtLpoOuuAR9mOPhoGHuWR1gg8A0vhvuT4S4BykK','admin','Product Owner','2024-12-20 21:41:45',1,625226140);
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;


--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `id_categorie` int(11) NOT NULL AUTO_INCREMENT,
  `nom_categorie` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  PRIMARY KEY (`id_categorie`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (15,'Hair Gail',NULL),(16,'Hand Cream',''),(17,'Lipstick',''),(19,'Oil',''),(20,'Perfume',''),(21,'Shampoo',''),(22,'Soap',''),(23,'Serum','');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producteurs`
--

DROP TABLE IF EXISTS `producteurs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `producteurs` (
  `id_producteur` int(11) NOT NULL AUTO_INCREMENT,
  `nom_cooperative` varchar(200) NOT NULL,
  `region` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `certifications` varchar(255) DEFAULT NULL,
  `contact_telephone` varchar(20) DEFAULT NULL,
  `contact_email` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_producteur`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producteurs`
--

LOCK TABLES `producteurs` WRITE;
/*!40000 ALTER TABLE `producteurs` DISABLE KEYS */;
/*!40000 ALTER TABLE `producteurs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produit_producteur`
--

DROP TABLE IF EXISTS `produit_producteur`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `produit_producteur` (
  `id_produit` int(11) NOT NULL,
  `id_producteur` int(11) NOT NULL,
  PRIMARY KEY (`id_produit`,`id_producteur`),
  KEY `id_producteur` (`id_producteur`),
  CONSTRAINT `produit_producteur_ibfk_1` FOREIGN KEY (`id_produit`) REFERENCES `produits` (`id_produit`),
  CONSTRAINT `produit_producteur_ibfk_2` FOREIGN KEY (`id_producteur`) REFERENCES `producteurs` (`id_producteur`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produit_producteur`
--

LOCK TABLES `produit_producteur` WRITE;
/*!40000 ALTER TABLE `produit_producteur` DISABLE KEYS */;
/*!40000 ALTER TABLE `produit_producteur` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produits`
--

DROP TABLE IF EXISTS `produits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `produits` (
  `id_produit` int(11) NOT NULL AUTO_INCREMENT,
  `nom_produit` varchar(200) NOT NULL,
  `description_courte` varchar(255) DEFAULT NULL,
  `description_complete` text DEFAULT NULL,
  `prix` decimal(10,2) NOT NULL,
  `stock` int(11) NOT NULL DEFAULT 0,
  `id_categorie` int(11) DEFAULT NULL,
  `origine` varchar(100) DEFAULT NULL,
  `certification` varchar(100) DEFAULT NULL,
  `poids` decimal(6,2) DEFAULT NULL,
  `unite_poids` varchar(20) DEFAULT NULL,
  `image_principale` varchar(255) DEFAULT NULL,
  `date_ajout` timestamp NOT NULL DEFAULT current_timestamp(),
  `est_disponible` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`id_produit`),
  KEY `id_categorie` (`id_categorie`),
  CONSTRAINT `produits_ibfk_1` FOREIGN KEY (`id_categorie`) REFERENCES `categories` (`id_categorie`)
) ENGINE=InnoDB AUTO_INCREMENT=186 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produits`
--

LOCK TABLES `produits` WRITE;
/*!40000 ALTER TABLE `produits` DISABLE KEYS */;
INSERT INTO `produits` VALUES (67,'Velvet Touch','A deeply moisturizing hand cream for soft, smooth hands.','Velvet Touch is enriched with argan oil and shea butter to provide intense hydration for dry, rough hands. Its non-greasy formula absorbs quickly, leaving your hands soft, smooth, and delicately scented.',12.99,45,16,'','',0.00,'','http://localhost//uploads/1734424104-2795602b-ac49-445a-a3b0-66f42b0660f4.jpg','2024-12-17 08:28:24',1),(68,'Amber Mystique Perfume',' A warm, captivating fragrance with amber and musk notes.',': Amber Mystique Perfume blends the richness of amber with earthy musk, creating an alluring and sophisticated scent. This fragrance is perfect for evening wear, leaving a lasting impression with its deep, warm aroma.',29.99,45,20,'','',0.00,'','http://localhost//uploads/1734424167-afc48825-4e14-4d4a-afbf-8a95994939da.jpg','2024-12-17 08:29:27',1),(72,'Moroccan Bloom Perfume','A warm, captivating fragrance with amber and musk notes.','Amber Mystique Perfume blends the richness of amber with earthy musk, creating an alluring and sophisticated scent. This fragrance is perfect for evening wear, leaving a lasting impression with its deep, warm aroma.',29.99,35,20,'','',0.00,'','http://localhost//uploads/1734424238-32371455-2c56-431a-bb55-e6f2190a9387.jpg','2024-12-17 08:30:38',1),(74,'Sahara Breeze Perfume','A light, airy fragrance with notes of sandalwood and citrus.','Sahara Breeze Perfume evokes the feeling of a cool breeze across the desert. A blend of refreshing citrus and smooth sandalwood creates a clean, refreshing scent, perfect for everyday wear.',27.99,23,20,'','',0.00,'','http://localhost//uploads/1734424358-04d9de87-b0eb-4a6a-bb72-21b58f285c28.jpg','2024-12-17 08:32:38',1),(76,'Desert Rose Perfume','A romantic and floral fragrance with notes of rose and vanilla.','Desert Rose Perfume is an enchanting blend of rose petals, vanilla, and a touch of musk. This captivating scent embodies the beauty of a desert rose in full bloom, offering a soft, sensual fragrance perfect for evening wear.',34.99,43,20,'','',0.00,'','http://localhost//uploads/1734424458-6fccb1d3-87e8-4394-ae0d-e6584729e707.jpg','2024-12-17 08:34:18',1),(85,'Mystic Oud Perfume','A rich, exotic fragrance with oud and spices.','Mystic Oud Perfume features the luxurious scent of oud, complemented by spicy notes of saffron and cinnamon. This deep, mysterious fragrance is perfect for those who love bold and captivating scents.',39.00,43,20,'','',0.00,'','http://localhost//uploads/1734426387-365d8834-bc2a-4de4-bf74-4f5ccb0a2f04.jpg','2024-12-17 09:06:27',1),(87,' Moroccan Rose','A timeless red inspired by the beauty of Moroccan roses.','Unleash your confidence with Moroccan Rose, a vibrant red lipstick enriched with argan oil for intense hydration and long-lasting color. This shade flatters every skin tone and is perfect for any occasion',400.00,26,17,'maroc','maroc',0.00,'','http://localhost//uploads/1734426424-8cdeba47-757e-40b7-8b6e-8b5366671a54.jpg','2024-12-17 09:07:04',1),(90,'Radiant Drops','A glow-enhancing serum for luminous skin','Radiant Drops is a lightweight serum infused with argan oil and vitamin C, designed to boost skin radiance and even out skin tone. It hydrates deeply while giving your skin a healthy, youthful glow.',22.99,114,23,'','',0.00,'','http://localhost//uploads/1734426510-27c7e186-fe07-47dc-8e92-fe7f99492ee1.jpg','2024-12-17 09:08:30',1),(91,'Casablanca Bloom','A floral-infused hand cream for silky hands.','Casablanca Bloom blends argan oil with floral extracts for a luxurious hand cream that nourishes and rejuvenates. Its light, floral scent adds a touch of elegance to your daily routine.',14.49,27,16,'','',0.00,'','http://localhost//uploads/1734426569-e8066435-67df-431c-938e-068e2e816c0e.jpg','2024-12-17 09:09:29',1),(92,'Casablanca Nights Perfume','A seductive fragrance with notes of vanilla, amber, and musk.','Casablanca Nights Perfume is a sensual and seductive blend of warm vanilla, amber, and musk. This fragrance is perfect for a romantic evening, evoking the allure of a moonlit night in Casablanca',36.49,51,20,'','',0.00,'','http://localhost//uploads/1734426577-da7f8e2e-e936-4ae3-af34-5b6d5edd5f88.jpg','2024-12-17 09:09:37',1),(96,'Spiced Saffron','A burnt orange shade with a touch of exotic flair.','Inspired by Morocco’s treasured spice, Spiced Saffron is a bold and unique lipstick. With argan oil, this shade ensures long-lasting comfort and a captivating look.',17.99,11,17,'','',0.00,'','http://localhost//uploads/1734426660-2db4e95f-5ac6-45c8-8306-83ed9a1ce720.jpg','2024-12-17 09:11:00',1),(101,'Sahara Soft','A lightweight hand cream for all-day hydration.','Sahara Soft is crafted with argan oil and hyaluronic acid to lock in moisture and keep your hands hydrated all day long. Its lightweight formula ensures smooth application without leaving residue.',12.99,37,16,'','',0.00,'','http://localhost//uploads/1734426723-4d9a4be8-7de0-4abd-8037-7c8f0c8f0af1.jpg','2024-12-17 09:12:03',1),(102,'Golden Elixir','A rejuvenating serum for anti-aging care.','Golden Elixir combines argan oil with hyaluronic acid to reduce fine lines and restore skin elasticity. This potent formula nourishes and revitalizes, leaving your skin plump and youthful.',29.99,58,23,'','',0.00,'','http://localhost//uploads/1734426750-31bf728f-1611-4147-ba3d-ea221b41a859.jpg','2024-12-17 09:12:30',1),(103,'Golden Sands Perfume','A warm, sun-kissed fragrance with hints of coconut and jasmine.','Golden Sands Perfume brings the essence of a sun-drenched beach with notes of coconut, jasmine, and a touch of vanilla. This tropical scent is perfect for a summer day, evoking warmth and sunshine.',28.99,46,20,'','',0.00,'','http://localhost//uploads/1734426816-f5e39486-df48-4df1-9d6c-adc7e9e0c114.jpg','2024-12-17 09:13:36',1),(104,'Golden Sahara','A warm nude that radiates natural elegance','Golden Sahara brings the beauty of the desert to your lips. Infused with the goodness of argan oil, this creamy nude shade offers a natural glow while nourishing your lips for all-day comfort',16.99,11,17,'maroc','',0.00,'','http://localhost//uploads/1734426840-7f42b730-c338-4734-bee1-3ce4c11b6474.jpg','2024-12-17 09:14:00',1),(105,'Berber Glow','A revitalizing hand cream for youthful hands.','Berber Glow features argan oil and vitamin E to reduce the appearance of fine lines and rejuvenate tired-looking hands. It nourishes deeply, restoring a youthful glow to your skin.',14.99,25,16,'','',0.00,'','http://localhost//uploads/1734426880-1875b228-c3ed-43f6-941f-a3953279a304.jpg','2024-12-17 09:14:41',1),(106,'Sahara Silk','A smoothing serum for frizz-free hair.','Sahara Silk is the ultimate hair serum for sleek, manageable hair. Infused with argan oil and keratin, it tames flyaways, protects against heat damage, and adds a silky finish.',18.99,60,23,'','',0.00,'','http://localhost//uploads/1734426886-178afa77-bd4e-4f9b-a77a-278944ac8b95.jpg','2024-12-17 09:14:46',1),(111,'Moroccan Spice Perfume','A spicy, exotic fragrance with hints of cinnamon and patchouli.','Moroccan Spice Perfume is a rich blend of cinnamon, patchouli, and a touch of clove, creating a warm, spicy fragrance with an exotic flair. This scent is perfect for those who love bold and adventurous perfumes',33.99,55,20,'','',0.00,'','http://localhost//uploads/1734426960-cc5acd0d-b2f8-46e3-b388-513f79cb4500.jpg','2024-12-17 09:16:00',1),(115,'Jasmine Essence Perfume','A delicate floral fragrance with fresh jasmine notes.','Jasmine Essence Perfume is a light, airy fragrance featuring fresh jasmine blossoms, enhanced by a touch of lily and bergamot. This fragrance captures the elegance and beauty of jasmine, perfect for any occasion.',25.99,55,20,'','',0.00,'','http://localhost//uploads/1734427036-a5c7d9f9-1998-41cb-8a98-e8d0534fff50.jpg','2024-12-17 09:17:16',1),(116,'Spiced Serenity','A warming hand cream for ultimate relaxation.','Spiced Serenity combines argan oil with cinnamon and ginger extracts for a unique, warming hand cream. It soothes dry skin, boosts circulation, and leaves your hands feeling soft and cozy.',15.00,49,16,'','',0.00,'','http://localhost//uploads/1734427053-8f7ee65e-75d2-4d8c-8360-7e2ec916ab56.jpg','2024-12-17 09:17:33',1),(117,'Moroccan Miracle','A multi-purpose serum for face, hair, and body.','Moroccan Miracle is a versatile serum enriched with pure argan oil. It deeply hydrates, repairs damaged hair, and soothes dry skin, making it your all-in-one beauty solution.',24.99,64,23,'','',0.00,'','http://localhost//uploads/1734427076-9e0d9ff8-ac5c-48df-8218-6d72e3eeb8c3.jpg','2024-12-17 09:17:56',1),(118,'Mystical Amber Perfume','A deep, mysterious fragrance with amber and oud.','Mystical Amber Perfume combines the rich warmth of amber with the exotic depth of oud, creating a captivating and luxurious scent. This fragrance is ideal for special occasions, offering a sophisticated, long-lasting aroma.\r\n\r\n',38.49,43,20,'','',0.00,'','http://localhost//uploads/1734427103-7397d383-f078-46f6-ac3a-31d959d4f715.jpg','2024-12-17 09:18:23',1),(120,'Atlas Breeze','A cooling hand cream for refreshed skin.','Atlas Breeze is a refreshing hand cream infused with argan oil and mint extract. Its cooling formula soothes and revitalizes tired, overworked hands, leaving a refreshing, light scent.',13.49,39,16,'','',0.00,'','http://localhost//uploads/1734427114-ee4da0a6-a61e-4f23-a202-fd6958d19486.jpg','2024-12-17 09:18:34',1),(121,'Berber Berry','A deep berry shade that adds drama and elegance',': Celebrate Moroccan heritage with Berber Berry, a rich and dramatic lipstick. Infused with argan oil, it glides on effortlessly, providing vibrant color and nourishing care in one swipe.',19.49,7,17,'maroc','maroc',0.00,'','http://localhost//uploads/1734427121-8cdeba47-757e-40b7-8b6e-8b5366671a54.jpg','2024-12-17 09:18:41',1),(122,'Atlas Glow','A brightening serum for a refreshed complexion.','Atlas Glow combines argan oil and natural fruit extracts to brighten dull skin and fade dark spots. Its non-greasy formula leaves your skin feeling refreshed and revitalized.',21.49,65,23,'','',0.00,'','http://localhost//uploads/1734427173-c9f9aee9-ec54-4e39-a1da-d71e81a8a6a7.jpg','2024-12-17 09:19:33',1),(123,'Moroccan Bliss','A nourishing hand cream for everyday use.','Moroccan Bliss combines argan oil and almond oil for a rich, everyday hand cream that protects and hydrates your skin. Perfect for keeping your hands soft and nourished throughout the day.',12.00,65,16,'','',0.00,'','http://localhost//uploads/1734427318-d16863ed-e7c2-44de-9ebc-4bd7d9d3ac02.jpg','2024-12-17 09:21:58',1),(124,'Moroccan Bliss Soap','A luxurious soap enriched with argan oil for smooth, hydrated skin.','Moroccan Bliss Soap combines the nourishing properties of pure argan oil with a blend of natural ingredients to cleanse and hydrate the skin. This soap provides deep moisture, leaving skin feeling soft and smooth while enjoying a light, exotic fragrance.',9.99,44,22,'','',0.00,'','http://localhost//uploads/1734427324-85e78efb-1db0-4e1a-9a3f-c128ff68fd3c.jpg','2024-12-17 09:22:04',1),(125,'Riad Rouge','A bold crimson that echoes Moroccan luxury','Indulge in the opulence of Riad Rouge, a luxurious crimson lipstick. With a creamy texture enriched with argan oil, it offers a rich, intense finish and a boost of hydration for a perfect pout.',19.99,11,17,'maroc','maroc',0.00,'','http://localhost//uploads/1734427331-69e3ee65-f4e5-4581-aaaf-ad1f286b0ca2.jpg','2024-12-17 09:22:11',1),(126,'Desert Rose Soap','A floral soap with rose extract to calm and soothe the skin.','Desert Rose Soap is infused with rose extract and argan oil to gently cleanse and moisturize the skin. This soap calms irritation and leaves the skin feeling refreshed and soft, with a delicate rose fragrance.',8.49,55,22,'','',0.00,'','http://localhost//uploads/1734427384-09ddb62b-0ba1-4096-95dc-c6e26b8aae21.jpg','2024-12-17 09:23:04',1),(127,'Golden Glow Soap','A brightening soap with vitamin C for radiant skin.','Golden Glow Soap is enriched with vitamin C and argan oil to brighten and even skin tone. This soap helps reduce dark spots, leaving skin glowing and refreshed after every use, while maintaining moisture for a smooth finish.',10.49,56,22,'','',0.00,'','http://localhost//uploads/1734427464-7ce1eefe-290e-414b-ab7b-26e762611ca2.jpg','2024-12-17 09:24:24',1),(128,'Golden Comfort','A soothing hand cream for sensitive skin.','Golden Comfort combines argan oil with aloe vera to calm and hydrate sensitive or irritated hands. Its gentle formula restores moisture and protects your skin from harsh environmental factors.',16.00,37,16,'','',0.00,'','http://localhost//uploads/1734427480-df5c4d7c-7533-444e-966b-4da6bc52d9ad.jpg','2024-12-17 09:24:40',1),(129,'Atlas Sunrise','A coral shade inspired by the morning glow over the Atlas Mountains.','Brighten your day with Atlas Sunrise, a cheerful coral lipstick enriched with moisturizing argan oil. Its vibrant yet wearable shade complements every mood and outfit.',16.99,20,17,'maroc','maroc',0.00,'','http://localhost//uploads/1734427480-940ee3c6-1327-4ec2-9a45-d96a604bf474.jpg','2024-12-17 09:24:40',1),(130,'Sahara Sand Soap','A exfoliating soap with Moroccan clay and sandalwood.','Sahara Sand Soap features Moroccan clay, which works as a natural exfoliant, and sandalwood for a soothing scent. This soap effectively removes dead skin cells, promoting smoother skin, while leaving behind a warm, earthy fragrance.',11.49,66,22,'','',0.00,'','http://localhost//uploads/1734427537-a22d3cec-5d7f-4a21-9522-b1e2757942aa.jpg','2024-12-17 09:25:37',1),(131,'Golden Luxe','A luxurious hand cream for dry, cracked skin.','Golden Luxe is a deeply restorative hand cream enriched with argan oil, cocoa butter, and ceramides. It repairs and soothes dry, cracked skin, leaving your hands feeling smooth and silky.',25.00,26,16,'','',0.00,'','http://localhost//uploads/1734427571-1f61d3d6-a74f-4c3a-8f05-4a6c92549cdc.jpg','2024-12-17 09:26:11',1),(132,'Desert Bloom','A fast-absorbing hand cream for soft, hydrated hands.','Desert Bloom features argan oil and jojoba oil for instant hydration. Its fast-absorbing formula is perfect for busy days, leaving your hands soft and smooth without any greasy residue.',38.99,37,16,'','',0.00,'','http://localhost//uploads/1734427663-b11321b5-bd8e-4ded-85ed-e57ffad336f1.jpg','2024-12-17 09:27:43',1),(133,'Amber Essence Soap','A rich, moisturizing soap with amber and argan oil.','Amber Essence Soap is a luxurious blend of amber and argan oil, designed to deeply hydrate and soften the skin. The soap cleanses gently while imparting a rich, warm amber scent that lingers throughout the day.',12.99,78,22,'','',0.00,'','http://localhost//uploads/1734427667-6a9e2cde-e421-4567-86fa-494aab0ad1fd.jpg','2024-12-17 09:27:47',1),(134,'Essaouira Breeze','A soft mauve perfect for a romantic vibe','Capture the essence of coastal serenity with Essaouira Breeze, a delicate mauve lipstick. Infused with argan oil, it keeps your lips soft and hydrated, giving you an effortlessly chic appearance',18.49,20,17,'maroc','maroc',0.00,'','http://localhost//uploads/1734427710-9996c15d-4153-4da0-bce3-5f30cbb0d651.jpg','2024-12-17 09:28:30',1),(136,'Moroccan Spice Soap','A fragrant soap with a blend of spices and argan oil.','Moroccan Spice Soap features a warming blend of spices like cinnamon, clove, and nutmeg, combined with nourishing argan oil. This soap cleanses and moisturizes while leaving a spicy, invigorating fragrance that fills the air.',9.49,78,22,'','',0.00,'','http://localhost//uploads/1734427772-a4c7f6e4-75e1-4862-b6bd-f13c1e3e9c52.jpg','2024-12-17 09:29:32',1),(137,'Jasmine Garden Soap','A delicate soap with jasmine extract for soft, fragrant skin.','Jasmine Garden Soap is infused with jasmine extract and argan oil, creating a soap that gently cleanses while providing deep hydration. The delicate floral scent of jasmine lingers on the skin, leaving it soft and fragrant.',8.99,43,22,'','',0.00,'','http://localhost//uploads/1734427852-2dc856ff-60b0-451f-95ef-1ecd27cf0ea9.jpg','2024-12-17 09:30:52',1),(138,'Sleek Hold','A lightweight gel for flexible, all-day hold.','Sleek Hold combines the power of argan oil with a lightweight formula to keep your hairstyle in place all day. Its non-sticky texture provides a natural finish, while nourishing your hair for a healthy shine. Perfect for everyday styling without stiffness or flakes.',19.99,48,15,'','',0.00,'','http://localhost//uploads/1734427873-3351475d-7019-4579-ae9c-be5af5db7614.jpg','2024-12-17 09:31:13',1),(139,'Fez Fuchsia','A bold fuchsia that lights up your smile','Turn heads with Fez Fuchsia, a striking shade that blends modern flair with Moroccan tradition. Enriched with argan oil, it hydrates your lips while delivering intense, buildable color',18.99,30,17,'maroc','maroc',0.00,'','http://localhost//uploads/1734427888-b9247aae-9bcf-4bf5-997d-78731b03f221.jpg','2024-12-17 09:31:28',1),(141,'Citrus Refresh Soap','A refreshing soap with citrus and mint for energizing cleanses.','Citrus Refresh Soap combines refreshing citrus oils with mint and argan oil to invigorate and cleanse the skin. This soap provides an energizing experience, perfect for starting your day, while keeping your skin soft and hydrated.',7.99,67,22,'','',0.00,'','http://localhost//uploads/1734427933-95396e9b-4942-438d-8d99-7f0dc467334e.jpg','2024-12-17 09:32:13',1),(142,'Lavender Serenity Soap','A calming soap with lavender and argan oil.','Lavender Serenity Soap is infused with calming lavender and soothing argan oil. This gentle soap helps relax the body and mind while moisturizing the skin, making it perfect for nighttime use or whenever you need a little relaxation.',10.99,86,22,'','',0.00,'','http://localhost//uploads/1734427997-2b338a62-7e60-4850-aa00-711d24af8a0d.jpg','2024-12-17 09:33:17',1),(143,'Honey Almond Soap','A nourishing soap with honey and almond extract for soft skin.','Honey Almond Soap combines the moisturizing properties of honey and almond extract with argan oil to nourish and hydrate the skin. This soap provides a creamy lather, leaving the skin feeling soft, smooth, and subtly scented with honey and almond.',8.99,28,22,'','',0.00,'','http://localhost//uploads/1734428051-4e7ec492-23be-4e6c-86ae-ce86a54ecdc7.jpg','2024-12-17 09:34:11',1),(144,'Casablanca Radiance','A hydrating serum for soft, dewy skin.','Casablanca Radiance is a deeply hydrating serum that replenishes moisture and improves skin texture. Infused with argan oil and aloe vera, it leaves your skin feeling soft, smooth, and dewy.',23.99,45,23,'','',0.00,'','http://localhost//uploads/1734428066-817a9455-c738-4ff4-8cfb-ef816b5c10c6.jpg','2024-12-17 09:34:26',1),(145,'. Casablanca Charm','A soft pink with a hint of shimmer, perfect for everyday wear','Add a touch of charm with Casablanca Charm, a delicate pink lipstick with a luminous finish. Crafted with argan oil, it ensures your lips stay hydrated and irresistible throughout the day',17.99,22,17,'maroc','maroc',0.00,'','http://localhost//uploads/1734428073-bac95e0d-a8a7-4bdc-80df-7f20e7922553.jpg','2024-12-17 09:34:33',1),(146,'Berber Bliss','A soothing serum for sensitive skin.','Berber Bliss is crafted with argan oil and chamomile extract to calm irritated skin. This gentle serum provides long-lasting hydration and is perfect for sensitive or redness-prone skin.',20.49,245,23,'','',0.00,'','http://localhost//uploads/1734428165-601042a2-2ba8-45d0-97f5-234465229c6c.jpg','2024-12-17 09:36:05',1),(147,'Spiced Glow','A warming serum for revitalized skin.','Spiced Glow combines argan oil with warming ginger and turmeric extracts to stimulate blood flow and rejuvenate tired skin. Ideal for a refreshed, radiant look.',25.00,3,23,'','',0.00,'','http://localhost//uploads/1734428223-32499060-3377-42c7-8204-7dd4aa3f4cb4.jpg','2024-12-17 09:37:03',1),(148,'Desert Luxe','A luxurious serum for intense hydration.','Desert Luxe is a rich serum infused with argan oil and ceramides to deeply hydrate and repair dry or damaged skin. Its silky texture absorbs quickly, leaving no residue.',26.99,70,23,'','',0.00,'','http://localhost//uploads/1734428322-77b06e5e-b5bb-4703-b200-0695a9cd0229.jpg','2024-12-17 09:38:42',1),(149,'Midnight Plum','A deep plum shade for bold and daring looks','Midnight Plum is a statement lipstick that exudes sophistication. Packed with nourishing argan oil, this shade glides on effortlessly, providing intense color and a smooth, velvety finish.',19.99,20,17,'maroc','maroc',0.00,'','http://localhost//uploads/1734428337-de46ed08-aa16-468a-a48b-4d2af964a588.jpg','2024-12-17 09:38:57',1),(150,'Eternal Oasis','An anti-fatigue serum for a refreshed look.','Eternal Oasis blends argan oil with caffeine and green tea extract to combat signs of fatigue. This lightweight serum reduces puffiness, smooths fine lines, and awakens tired skin.',24.49,89,23,'','',0.00,'','http://localhost//uploads/1734428465-871a20ca-7889-4c81-8d56-4f36b6a44f45.jpg','2024-12-17 09:41:05',1),(151,'Sahara Shine Oil','A shine-enhancing oil for glossy, healthy hair','Sahara Shine Oil is formulated with argan oil and silk proteins to provide ultimate shine and smoothness. This lightweight oil eliminates frizz, adds shine, and protects hair from environmental damage while keeping it soft and manageable',18.99,298,19,'maroc','',0.00,'','http://localhost//uploads/1734428549-0ec9885d-6ec9-470c-8df6-ba5278e6c343.jpg','2024-12-17 09:42:29',1),(152,'Moroccan Sculpt','A defining gel for perfectly shaped styles.','Moroccan Sculpt is enriched with argan oil and pro-vitamin B5 to help you achieve well-defined hairstyles. Whether sleek or textured, this gel ensures long-lasting hold while adding a touch of hydration and shine to your hair.',19.00,71,15,'','',0.00,'','http://localhost//uploads/1734428561-2c8ab80f-b2a0-4836-9d9d-de978e87b8ef.jpg','2024-12-17 09:42:41',1),(153,'Argan Essence','A nourishing shampoo for soft, silky hair.','Argan Essence is enriched with pure argan oil to deeply nourish and hydrate your hair. It restores natural shine and softness while strengthening every strand, leaving your hair feeling luxurious and healthy.',15.99,66,21,'','',0.00,'','http://localhost//uploads/1734428617-3ac2e6bc-4033-4b4e-8701-8077cf37b54d.jpg','2024-12-17 09:43:37',1),(154,'Golden Grip','A strong-hold gel for bold, confident styles.','Golden Grip is designed for those who need maximum hold without compromising hair health. Infused with argan oil and keratin, it locks your hairstyle in place while protecting and strengthening each strand. Ideal for bold, confident looks.',34.00,26,15,'','',0.00,'','http://localhost//uploads/1734428634-075d29e3-9dcb-4908-9d3c-f1c1a78b2528.jpg','2024-12-17 09:43:54',1),(155,'Berber Gold Oil','A rejuvenating oil for a youthful appearance','Berber Gold Oil is infused with argan oil and vitamins A and E to restore and maintain youthful skin. It helps to diminish fine lines, tighten skin, and nourish hair from root to tip, leaving a radiant and youthful glow',25.66,22,19,'maroc','maroc',0.00,'','http://localhost//uploads/1734428639-4bc86d02-a70c-4886-8aec-ce988ffc7f35.jpg','2024-12-17 09:43:59',1),(156,'Desert Rose Oil','A soothing oil for sensitive skin','Desert Rose Oil is enriched with argan oil and rose extract, designed for sensitive skin. It calms irritation, reduces redness, and deeply hydrates, leaving skin feeling soft and smooth. The delicate rose scent adds a touch of luxur',22.67,22,19,'maroc','maroc',0.00,'','http://localhost//uploads/1734428763-75e28619-637a-4ef4-84e4-aa2db8e345c8.jpg','2024-12-17 09:46:03',1),(157,'Atlas Wave','A curl-enhancing gel for natural definition.','Atlas Wave is perfect for wavy or curly hair, offering lightweight hold and enhanced definition. Infused with argan oil and aloe vera, it tames frizz and locks in moisture for soft, bouncy curls that last all day.',27.49,71,15,'','',0.00,'','http://localhost//uploads/1734428828-f6b12be7-6e2b-49b7-abde-58d6aa7f0fcb.jpg','2024-12-17 09:47:08',1),(158,'Moroccan Glow','A revitalizing shampoo for radiant hair.','Infused with Moroccan argan oil, Moroccan Glow revives dull hair, enhancing its natural radiance and vibrancy. Its gentle formula cleanses while providing intense hydration, making your hair look and feel refreshed.',16.99,32,21,'','',0.00,'','http://localhost//uploads/1734428861-0c1d7b74-d526-4dca-bff8-27fe1f997392.jpg','2024-12-17 09:47:41',1),(159,'Spiced Essence Oil','A rejuvenating oil with a spicy, invigorating scen','Spiced Essence Oil combines argan oil with essential oils of cinnamon and ginger to rejuvenate both skin and hair. This oil nourishes dry, rough skin while promoting healthy hair growth and adding a refreshing, spicy fragrance.',23.99,22,19,'maroc','maroc',0.00,'','http://localhost//uploads/1734428875-95f97f53-f9cb-4230-9c28-8c2c36e4e4f8.jpg','2024-12-17 09:47:55',1),(160,'Desert Shine','A styling gel for a sleek, glossy finish.','Desert Shine delivers a sleek, polished look with a glossy finish. Packed with argan oil and silk proteins, it smooths frizz, adds a brilliant shine, and keeps your hairstyle intact without making your hair feel sticky.',15.00,34,15,'','',0.00,'','http://localhost//uploads/1734428910-98e85a8a-c0b3-4325-8f84-081283bb0734.jpg','2024-12-17 09:48:30',1),(161,'Golden Hydration','A moisturizing shampoo for dry and damaged hair.','Say goodbye to dryness with Golden Hydration, a shampoo that deeply moisturizes and repairs dry, damaged hair. Packed with the goodness of argan oil, it replenishes lost moisture, leaving your hair soft, smooth, and manageable.',14.99,29,21,'','',0.00,'','http://localhost//uploads/1734428978-b35a67e8-c18c-4c0c-842a-507853218d98.jpg','2024-12-17 09:49:38',1),(162,'Berber Hold','A medium-hold gel for versatile styling.','Berber Hold provides the perfect balance between control and flexibility. Enriched with argan oil and glycerin, it offers medium hold and hydration, allowing you to create both structured and relaxed hairstyles.',18.99,98,15,'','',0.00,'','http://localhost//uploads/1734429013-ba44ba0a-5f59-4325-8211-173b049f740f.jpg','2024-12-17 09:50:13',1),(163,'Moroccan Miracle Oil','A multi-purpose oil for deep hydration and repair','Moroccan Miracle Oil is a versatile oil that provides deep nourishment to hair, face, and body. Packed with argan oil and vitamin E, it repairs damage, reduces dryness, and improves skin elasticity. This oil works wonders for all skin and hair types.',22.99,44,19,'maroc','maroc',0.00,'','http://localhost//uploads/1734429033-261cb983-07ee-4cfa-ba69-bc079a62bf10.jpg','2024-12-17 09:50:33',1),(164,'Atlas Fresh','A clarifying shampoo for a clean, refreshed scalp.','Atlas Fresh is your go-to shampoo for a thorough cleanse. Its argan oil-enriched formula removes build-up and impurities, promoting a healthy scalp and refreshed, lightweight hair.',13.99,30,21,'','',0.00,'','http://localhost//uploads/1734429044-22de427c-dafb-4b6e-a4e5-4ccd0aeff945.jpg','2024-12-17 09:50:44',1),(166,'Spiced Style','A textured gel for rugged, tousled looks.','Spiced Style is infused with argan oil and natural clay to create textured, tousled looks with ease. Its lightweight formula adds volume and hold while nourishing your hair, giving it a rugged, natural finish.',12.99,58,15,'','',0.00,'','http://localhost//uploads/1734429094-42cf9056-fefd-4797-a4ac-a9075c151036.jpg','2024-12-17 09:51:34',1),(167,'Mystic Dusk Perfume',' An intense, seductive fragrance in bold, modern packaging.','Mystic Dusk Perfume delivers a captivating blend of woody, spicy, and fresh notes, creating a powerful yet sophisticated aroma that lingers all day. Inspired by the raw beauty of Moroccan landscapes, this fragrance combines earthy tones of oud and amber with a touch of citrus and spices. Encased in sleek, cylindrical packaging with a deep midnight gradient and a luxurious magnetic cap, Mystic Dusk mirrors timeless elegance and modern allure. Perfect for any occasion, this fragrance embodies confidence, mystery, and sophistication.',59.00,103,20,'','',0.00,'','http://localhost//uploads/1734429100-4b5bc59b-d7d0-44fc-89b8-88f4f9cfcce5.jpg','2024-12-17 09:51:40',1),(168,'Riad Luxe','A luxurious shampoo for silky, smooth hair.',': Indulge your senses with Riad Luxe, a rich shampoo infused with premium argan oil. It smooths frizz and tames flyaways, leaving your hair silky, sleek, and irresistibly touchable.',17.99,17,21,'','',0.00,'','http://localhost//uploads/1734429109-7967b5cc-9349-4e89-8ecd-167ceab18228.jpg','2024-12-17 09:51:49',1),(169,'Golden Elixir Oil','A nourishing oil for hair and skin','Golden Elixir Oil is a luxurious blend of pure argan oil, rich in antioxidants and essential fatty acids, perfect for hydrating both hair and skin. It restores moisture, promotes shine, and strengthens hair while softening and rejuvenating your skin.',19.99,49,19,'maroc','maroc',0.00,'','http://localhost//uploads/1734429149-281d9c9f-7b4c-4f43-aab5-5218a45cb652.jpg','2024-12-17 09:52:29',1),(170,'Casablanca Grip','A high-performance gel for humidity-resistant hold.','Casablanca Grip is formulated with argan oil and humidity-resistant technology to keep your hairstyle intact even in the toughest weather conditions. Ideal for all hair types, it provides a strong hold and a smooth, polished look.',16.00,48,15,'','',0.00,'','http://localhost//uploads/1734429198-3eda7088-5d34-4660-9ad3-c5c7f6cd7e11.jpg','2024-12-17 09:53:18',1),(171,'Berber Blossom','A gentle shampoo for everyday use.','Berber Blossom combines the natural benefits of argan oil with a lightweight formula perfect for daily use. It gently cleanses while maintaining your hair’s natural oils, ensuring balanced hydration and softness.',13.49,13,21,'','',0.00,'','http://localhost//uploads/1734429204-354ffc83-7ed3-4f32-a0a4-2b2ad74f24e6.jpg','2024-12-17 09:53:24',1),(172,'Eternal Radiance Oil','A luxurious anti-aging oil for glowing skin.','Eternal Radiance Oil is a premium blend of argan oil, retinol, and antioxidants. This oil works to rejuvenate and firm aging skin, reducing the appearance of wrinkles while giving your face a radiant, youthful glow',27.99,44,19,'maroc','maroc',0.00,'','http://localhost//uploads/1734429236-5567fba2-c13b-432f-a6ad-5a902e8f9ae4.jpg','2024-12-17 09:53:56',1),(173,'Sahara Control','A volumizing gel for fuller, thicker styles.','Sahara Control is perfect for adding volume and body to fine hair. Enriched with argan oil and wheat proteins, this gel offers a lightweight hold while creating fuller, thicker hairstyles that look natural and feel soft.',24.45,25,15,'','',0.00,'','http://localhost//uploads/1734429304-31bb792d-b049-4a65-b582-9555573f01f8.jpg','2024-12-17 09:55:04',1),(175,'Casablanca Luxe Oil','A luxurious oil for hair and skin.','Casablanca Luxe Oil is a rich, hydrating formula designed to restore vitality and radiance to hair and skin. Packed with argan oil and jojoba oil, it nourishes deeply, repairs damage, and leaves a silky-smooth finish.',24.49,22,19,'maroc','maroc',0.00,'','http://localhost//uploads/1734429336-579281ff-a313-414b-80a2-5732d8099792.jpg','2024-12-17 09:55:36',1),(176,'Sahara Strength','A fortifying shampoo for strong, resilient hair.','Strengthen your hair with Sahara Strength. This argan oil-infused shampoo reinforces weak strands, preventing breakage and promoting healthy growth. Your hair will feel stronger, thicker, and full of life.',15.00,16,21,'','',0.00,'','http://localhost//uploads/1734429404-9dfbccf9-5124-4496-b399-17e1f54b0db2.jpg','2024-12-17 09:56:44',1),(178,'Moroccan Miracle Oil','A multi-purpose oil for deep hydration and repair','Moroccan Miracle Oil is a versatile oil that provides deep nourishment to hair, face, and body. Packed with argan oil and vitamin E, it repairs damage, reduces dryness, and improves skin elasticity. This oil works wonders for all skin and hair types.',21.99,27,19,'maroc','maroc',0.00,'','http://localhost//uploads/1734429423-cb3ff4e2-e5b6-495d-a238-3c43bbfe4f48.jpg','2024-12-17 09:57:03',1),(179,'Eternal Fix','An ultra-strong gel for extreme styles.','Eternal Fix is your ultimate solution for extreme styling. Its ultra-strong formula, enriched with argan oil and bamboo extract, locks even the most daring hairstyles in place. Long-lasting and flake-free, this gel is perfect for special occasions or bold everyday looks.',17.99,32,15,'','',0.00,'','http://localhost//uploads/1734429428-c536ea55-0bf2-4274-889c-62dd599c3cfd.jpg','2024-12-17 09:57:08',1),(181,'Casablanca Shine','A shine-enhancing shampoo for vibrant hair.','Casablanca Shine is specially formulated to enhance your hair’s natural brilliance. Infused with argan oil, it smooths the cuticle and reflects light, giving your hair a glossy, mirror-like shine.',15.99,15,21,'','',0.00,'','http://localhost//uploads/1734429482-c4884d87-9641-4c20-b922-f251fdda9609.jpg','2024-12-17 09:58:02',1),(182,'Atlas Glow Oil','A brightening oil for radiant skin.','Atlas Glow Oil blends argan oil with vitamin C to brighten dull, tired skin. It helps even out skin tone, reduce dark spots, and add a natural glow. The lightweight formula absorbs quickly, leaving a non-greasy finish.',45.00,22,19,'maroc','maroc',0.00,'','http://localhost//uploads/1734429514-d010a60a-c5bd-40f6-88ee-cbee188da16e.jpg','2024-12-17 09:58:34',1),(183,'Spiced Serenity','A soothing shampoo for a relaxed scalp.','Experience the calming effects of Spiced Serenity, a shampoo infused with argan oil and soothing botanicals. It gently cleanses and calms an irritated scalp, leaving your hair soft and your scalp refreshed.',13.00,14,21,'','',0.00,'','http://localhost//uploads/1734429642-331d3aac-5077-44cc-b5be-8f01601dda98.jpg','2024-12-17 10:00:42',1),(184,'Desert Bloom','A volumizing shampoo for fuller hair','Achieve bouncy, voluminous hair with Desert Bloom. Enriched with argan oil, it lifts your roots and adds body to your hair without weighing it down, leaving it full and vibrant.',16.99,16,21,'','',0.00,'','http://localhost//uploads/1734429735-0c3f3e07-a4e7-4ab6-ba1d-2afae84dea16.jpg','2024-12-17 10:02:15',1);
/*!40000 ALTER TABLE `produits` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) NOT NULL,
  `prenom` varchar(20) NOT NULL,
  `numero_telephone` varchar(20) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `mot_de_passe` varchar(255) NOT NULL,
  `date_inscription` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id_user`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (5,'elhaddad','chouaib','0688037279','chouaibeelhaddad24@gmail.com','$2y$10$7NyTzDaysnsGXoeErlHFgeVqjRO/JgJM6x2kSXR3GX60DRvJKjFWa','2024-12-17 22:19:42'),(11,'dakir','hamza','0688037279','hamzadakir@gmail.com','$2y$10$LfKuh1MudyMPL0RXLNn2SefY1aqoocw4vOTQPwISkSEBPiqNBIIY.','2024-12-23 09:55:17'),(15,'qdcdqxc','reipb','234567222','otmanerRZmaili@gmail.com','$2y$10$4SiCkBZq1I3x2RWfSmJRaesoWM9w8A0a0fHMbxV642Mavg3be5axy','2024-12-24 21:14:00'),(16,'elhaddad','chouaib','0688037279','chouaibeelhaddad@gmail.com','$2y$10$lLV0.6PtQ.C.v7o9Y.lZO.csKEq4xQrozuw9SXlGjEILvvZEMJqze','2024-12-25 14:31:53'),(17,'saad','es-safryouy','0644796181','smaz50317@gmail.com','$2y$10$tor95rvb0kFAg.9blKRL/eeIfn7zsS9sb/AOywqtAy3Z/EQfjXS0u','2024-12-25 14:35:55'),(18,'jad','elhaddad','0688037279','jadelhaddad@gmail.com','$2y$10$NBv1WKywBcW/i3LlUUYM/eIAGB3.Lr6Z6q6k4F7d5/Xxr4H0Bzeju','2024-12-25 14:44:36'),(19,'said','said','0555555553','said@gmail.com','$2y$10$p0Qh5hszD6opDr/5wt3t6OBLt4N.k1Q3ESlIy.Zfu6N8QE.ngyTRi','2024-12-25 18:56:03'),(20,'chouaib','jad','0688888888','jadelhaddad4@gmail.com','$2y$10$HxF452X82OWPIQhubDD2B.9VdhCJ25F.B6CrjohTt3/Lezu4OpLQO','2024-12-25 19:11:53'),(21,'ihab','chaouki','0688038888','ihab@gmail.com','$2y$10$eWHNGgK7twRTwJjsffDCS.Tdbe5PxV/725Ix3LtSDX0mYd60ETZdC','2024-12-25 19:13:18'),(22,'rim','rim','06999999','rim@gmail.com','$2y$10$KVx1IAb6XbEDWoJEceLjUuIb8riJaOopLh2hDiy6hKH5e/HSYflxa','2024-12-25 19:30:24');

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cart` (
  `id_cart` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `date_ajout` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id_cart`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (3,15,'2024-12-24 21:14:00'),(4,16,'2024-12-25 14:31:53'),(5,17,'2024-12-25 14:35:55'),(6,18,'2024-12-25 14:44:36'),(7,19,'2024-12-25 18:56:03'),(8,20,'2024-12-25 19:11:53'),(9,21,'2024-12-25 19:13:18'),(10,22,'2024-12-25 19:30:24');
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart_items`
--

DROP TABLE IF EXISTS `cart_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cart_items` (
  `id_cart_item` int(11) NOT NULL AUTO_INCREMENT,
  `id_cart` int(11) DEFAULT NULL,
  `id_produit` int(11) DEFAULT NULL,
  `quantite` int(11) NOT NULL DEFAULT 1,
  `date_ajout` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id_cart_item`),
  KEY `id_cart` (`id_cart`),
  KEY `id_produit` (`id_produit`),
  CONSTRAINT `cart_items_ibfk_1` FOREIGN KEY (`id_cart`) REFERENCES `cart` (`id_cart`) ON DELETE CASCADE,
  CONSTRAINT `cart_items_ibfk_2` FOREIGN KEY (`id_produit`) REFERENCES `produits` (`id_produit`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=112 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_items`
--

LOCK TABLES `cart_items` WRITE;
/*!40000 ALTER TABLE `cart_items` DISABLE KEYS */;
INSERT INTO `cart_items` VALUES (9,6,146,4,'2024-12-25 15:06:36'),(10,6,90,3,'2024-12-25 15:06:49'),(11,6,167,1,'2024-12-25 15:07:00'),(44,9,146,2,'2024-12-25 19:18:10'),(45,9,142,2,'2024-12-25 19:18:56'),(46,9,167,1,'2024-12-25 19:20:07'),(47,9,90,1,'2024-12-25 19:28:30'),(48,10,90,13,'2024-12-25 19:31:08'),(49,10,76,2,'2024-12-25 19:33:42'),(50,10,127,1,'2024-12-25 19:45:44'),(51,10,111,8,'2024-12-25 20:01:21'),(69,10,116,1,'2024-12-26 08:20:28'),(74,10,146,14,'2024-12-26 11:30:36'),(95,5,90,1,'2024-12-27 19:57:31'),(103,10,142,1,'2025-01-07 16:41:27'),(104,10,161,2,'2025-01-07 16:57:09'),(105,10,170,4,'2025-01-07 16:59:59'),(110,3,139,1,'2025-02-22 08:06:50');
/*!40000 ALTER TABLE `cart_items` ENABLE KEYS */;
UNLOCK TABLES;

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-24 15:50:47
