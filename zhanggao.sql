/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50714
Source Host           : localhost:3306
Source Database       : login

Target Server Type    : MYSQL
Target Server Version : 50714
File Encoding         : 65001

Date: 2017-06-16 15:34:51
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for product_goods
-- ----------------------------
DROP TABLE IF EXISTS `product_goods`;
CREATE TABLE `product_goods` (
  `id` int(255) unsigned NOT NULL AUTO_INCREMENT,
  `guid` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` varchar(10) DEFAULT NULL,
  `oldPrice` varchar(255) DEFAULT NULL,
  `size_one` varchar(255) DEFAULT NULL,
  `size_two` varchar(255) DEFAULT NULL,
  `size_three` varchar(255) DEFAULT NULL,
  `imgurl` varchar(255) DEFAULT NULL,
  `big_imgurl` varchar(255) DEFAULT NULL,
  `imgurl_two` varchar(255) DEFAULT NULL,
  `big_imgurl_two` varchar(255) DEFAULT NULL,
  `imgurl_three` varchar(255) DEFAULT NULL,
  `big_imgurl_three` varchar(255) DEFAULT NULL,
  `imgurl_four` varchar(255) DEFAULT NULL,
  `big_imgurl_four` varchar(255) DEFAULT NULL,
  `createtime` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=66 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of product_goods
-- ----------------------------
INSERT INTO `product_goods` VALUES ('1', 'ZVP-112-00067', 'MARIMEKKO', '粉色拼橘色图案印花圆领无袖女士连衣裙', '￥1,098', ' ￥2,195', '34', '36', '40', '../img/goods/img1.jpg', '../img/goods/bigimg1.jpg', '../img/goods/img2.jpg', '../img/goods/bigimg2.jpg', '../img/goods/img3.jpg', '../img/goods/bigimg3.jpg', '../img/goods/img4.jpg', '../img/goods/bigimg4.jpg', '2017-06-14 10:20:30');
INSERT INTO `product_goods` VALUES ('2', 'ZVP-920-00005', 'MARIMEKKO', '多色几何印花枕套', '￥196', ' ￥490', '', '', '', '../img/goods/img_two_1.jpg', '../img/goods/bigimg_two_1.jpg', '../img/goods/img_two_2.jpg', '../img/goods/bigimg_two_2.jpg', null, null, null, null, '2017-06-14 10:57:38');
INSERT INTO `product_goods` VALUES ('3', 'ZVP-112-00042', 'MARIMEKKO', '白色波点圆领短袖女士连衣裙', '￥1,120', ' ￥2,800', 'XS', 'L', 'XL', '../img/goods/img_three_1.jpg', '../img/goods/bigimg_three_1.jpg', '../img/goods/img_three_2.jpg', '../img/goods/bigimg_three_2.jpg', '../img/goods/img_three_3.jpg', '../img/goods/bigimg_three_3.jpg', '../img/goods/img_three_4.jpg', '../img/goods/bigimg_three_4.jpg', '2017-06-14 14:03:43');
INSERT INTO `product_goods` VALUES ('4', 'ZVP-112-00001', ' MARIMEKKO', '多色图案印花圆领短袖女士连衣裙', '￥1,200', ' ￥4,000', '30', '31', '32', '../img/goods/img_four_1.jpg', '../img/goods/bigimg_four_1.jpg', '../img/goods/img_four_2.jpg', '../img/goods/bigimg_four_2.jpg', '../img/goods/img_four_3.jpg', '../img/goods/bigimg_four_3.jpg', '../img/goods/img_four_4.jpg', '../img/goods/bigimg_four_4.jpg', '2017-06-14 14:04:52');
INSERT INTO `product_goods` VALUES ('5', null, ' MARIMEKKO', '黑白拼色图案印花女士单肩包', '￥480', ' ￥1,600', null, null, null, '../img/list/5.jpg', null, null, null, null, null, null, null, '2017-06-13 14:45:29');
INSERT INTO `product_goods` VALUES ('6', null, ' MARIMEKKO', '灰色简约女士A字裙', '￥1,120', ' ￥2,800', null, null, null, '../img/list/6.jpg', null, null, null, null, null, null, null, '2017-06-13 14:45:32');
INSERT INTO `product_goods` VALUES ('7', null, ' MARIMEKKO', '灰色简约女士A字裙', '￥1,120', ' ￥2,800', null, null, null, '../img/list/7.jpg', null, null, null, null, null, null, null, '2017-06-13 14:45:35');
INSERT INTO `product_goods` VALUES ('8', null, ' MARIMEKKO', '黑灰拼色波浪纹女士袜子', '￥116', ' ￥290', null, null, null, '../img/list/8.jpg', null, null, null, null, null, null, null, '2017-06-13 14:45:37');
INSERT INTO `product_goods` VALUES ('9', null, ' MARIMEKKO', '蓝色波点圆领短袖女士连衣裙', '￥1,120', ' ￥2,800', null, null, null, '../img/list/9.jpg', null, null, null, null, null, null, null, '2017-06-13 14:45:42');

-- ----------------------------
-- Table structure for product_list
-- ----------------------------
DROP TABLE IF EXISTS `product_list`;
CREATE TABLE `product_list` (
  `id` int(255) unsigned NOT NULL AUTO_INCREMENT,
  `category` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` varchar(10) DEFAULT NULL,
  `oldPrice` varchar(255) DEFAULT NULL,
  `imgurl` varchar(255) DEFAULT NULL,
  `createtime` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=103 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of product_list
-- ----------------------------
INSERT INTO `product_list` VALUES ('1', 'MARIMEKKO', '粉色拼橘色图案印花圆领无袖女士连衣裙', '￥1,098', ' ￥2,195', '../img/list/0.jpg', '2017-06-10 10:29:32');
INSERT INTO `product_list` VALUES ('2', 'MARIMEKKO', '多色几何印花枕套', '￥196', ' ￥490', '../img/list/2.jpg', '2017-06-14 11:21:54');
INSERT INTO `product_list` VALUES ('3', 'MARIMEKKO', '白色波点圆领短袖女士连衣裙', '￥1,120', ' ￥2,800', '../img/list/1.jpg', '2017-06-14 11:21:35');
INSERT INTO `product_list` VALUES ('4', 'MARIMEKKO', '多色图案印花圆领短袖女士连衣裙', '￥1,200', ' ￥4,000', '../img/list/3.jpg', '2017-06-10 10:29:37');
INSERT INTO `product_list` VALUES ('5', ' MARIMEKKO', '蓝色条纹圆领长袖女士连衣裙', '￥1,080', ' ￥2,700', '../img/list/4.jpg', '2017-06-10 10:29:57');
INSERT INTO `product_list` VALUES ('6', ' MARIMEKKO', '黑白拼色图案印花女士单肩包', '￥480', ' ￥1,600', '../img/list/5.jpg', '2017-06-10 11:15:09');
INSERT INTO `product_list` VALUES ('7', ' MARIMEKKO', '灰色简约女士A字裙', '￥1,120', ' ￥2,800', '../img/list/6.jpg', '2017-06-10 11:16:34');
INSERT INTO `product_list` VALUES ('8', ' MARIMEKKO', '灰色简约女士A字裙', '￥1,120', ' ￥2,800', '../img/list/7.jpg', '2017-06-10 11:18:07');
INSERT INTO `product_list` VALUES ('9', ' MARIMEKKO', '黑灰拼色波浪纹女士袜子', '￥116', ' ￥290', '../img/list/8.jpg', '2017-06-10 11:18:48');
INSERT INTO `product_list` VALUES ('10', ' MARIMEKKO', '蓝色波点圆领短袖女士连衣裙', '￥1,120', ' ￥2,800', '../img/list/9.jpg', '2017-06-10 11:19:56');
INSERT INTO `product_list` VALUES ('11', 'MARIMEKKO', '黑色荔枝纹拉链女士单肩包', '￥1,848', ' ￥3,695', '../img/list/10.jpg', '2017-06-15 16:27:33');
INSERT INTO `product_list` VALUES ('12', 'MARIMEKKO', '绿色系带圆领长袖女士连衣裙', '￥1,040', ' ￥2,600', '../img/list/11.jpg', '2017-06-15 16:28:50');
INSERT INTO `product_list` VALUES ('13', 'MARIMEKKO', '深蓝色图案印花女士单肩包', '￥360', ' ￥1,200', '../img/list/11.jpg', '2017-06-15 16:29:41');
INSERT INTO `product_list` VALUES ('14', 'MARIMEKKO', '黑白拼色花朵印花圆领长袖女士上衣', '￥1,290', '￥4,300', '../img/list/12.jpg', '2017-06-15 16:30:20');
INSERT INTO `product_list` VALUES ('15', 'MARIMEKKO', '深咖色圆领九分袖女士连衣裙', '￥1,848', '￥3,695', '../img/list/13.jpg', '2017-06-15 16:31:10');
INSERT INTO `product_list` VALUES ('16', 'MARIMEKKO', '棕色拼白色立体拼接女士耳环', '￥156', '￥390', '../img/list/14.jpg', '2017-06-15 16:31:49');
INSERT INTO `product_list` VALUES ('17', 'MARIMEKKO', '黑白拼色图案印花女士半身裙', '￥1,248', '￥2,495', '../img/list/15.jpg', '2017-06-15 16:34:44');
INSERT INTO `product_list` VALUES ('18', 'MARIMEKKO', '红色简约圆领短袖女士连衣裙', '￥1,200', '￥3,000', '../img/list/16.jpg', '2017-06-15 16:35:15');
INSERT INTO `product_list` VALUES ('19', 'MARIMEKKO', '黑色格纹圆领中袖女士连衣裙', '￥1,800', ' ￥4,500', '../img/list/17.jpg', '2017-06-15 16:36:02');
INSERT INTO `product_list` VALUES ('20', 'MARIMEKKO', '深咖色圆领九分袖女士连衣裙', '￥1,848', '￥3,000', '../img/list/18.jpg', '2017-06-15 20:51:39');
INSERT INTO `product_list` VALUES ('21', 'MARIMEKKO', '深蓝色图案印花女士单肩包', '￥1,800', '￥3,695', '../img/list/19.jpg', '2017-06-15 20:52:42');
INSERT INTO `product_list` VALUES ('22', 'MARIMEKKO', '绿色系带圆领长袖女士连衣裙', '￥1,040', ' ￥1,200', '../img/list/20.jpg', '2017-06-15 20:52:47');
INSERT INTO `product_list` VALUES ('23', 'MARIMEKKO', '黑白拼色花朵印花圆领长袖女士上衣', '￥1,290', ' ￥2,600', '../img/list/21.jpg', '2017-06-15 20:53:15');
INSERT INTO `product_list` VALUES ('24', 'MARIMEKKO', '深咖色圆领九分袖女士连衣裙', '￥1,800', ' ￥4,500', '../img/list/22.jpg', '2017-06-15 20:53:39');
INSERT INTO `product_list` VALUES ('25', 'MARIMEKKO', '深蓝色图案印花女士单肩包', '￥1,200', '￥3,000', '../img/list/23.jpg', '2017-06-15 20:54:04');
INSERT INTO `product_list` VALUES ('26', 'MARIMEKKO', '黑色荔枝纹拉链女士单肩包', '￥1,040', '￥3,000', '../img/list/24.jpg', '2017-06-15 20:54:30');
INSERT INTO `product_list` VALUES ('27', 'MARIMEKKO', '红色简约圆领短袖女士连衣裙', '￥1,848', '￥3,000', '../img/list/25.jpg', '2017-06-15 20:55:23');
INSERT INTO `product_list` VALUES ('28', 'MARIMEKKO', '黑白拼色花朵印花圆领长袖女士上衣', '￥1,848', '￥3,695', '../img/list/26.jpg', '2017-06-15 20:55:50');
INSERT INTO `product_list` VALUES ('29', 'MARIMEKKO', '深咖色圆领九分袖女士连衣裙', '￥1,290', ' ￥2,600', '../img/list/27.jpg', '2017-06-15 20:56:26');
INSERT INTO `product_list` VALUES ('30', 'MARIMEKKO', '深咖色圆领九分袖女士连衣裙', '￥1,290', ' ￥2,600', '../img/list/28.jpg', '2017-06-15 20:56:26');
INSERT INTO `product_list` VALUES ('31', 'MARIMEKKO', '深咖色圆领九分袖女士连衣裙', '￥1,290', ' ￥2,600', '../img/list/29.jpg', '2017-06-15 20:56:26');
INSERT INTO `product_list` VALUES ('32', 'MARIMEKKO', '深咖色圆领九分袖女士连衣裙', '￥1,800', '￥3,000', '../img/list/30.jpg', '2017-06-15 20:58:12');
INSERT INTO `product_list` VALUES ('33', 'MARIMEKKO', '深咖色圆领九分袖女士连衣裙', '￥1,800', '￥3,000', '../img/list/31.jpg', '2017-06-15 21:01:29');
INSERT INTO `product_list` VALUES ('34', 'MARIMEKKO', '深咖色圆领九分袖女士连衣裙', '￥1,800', '￥3,000', '../img/list/32.jpg', '2017-06-15 21:01:36');
INSERT INTO `product_list` VALUES ('35', 'MARIMEKKO', '深咖色圆领九分袖女士连衣裙', '￥1,800', '￥3,000', '../img/list/33.jpg', '2017-06-15 21:01:39');
INSERT INTO `product_list` VALUES ('36', 'MARIMEKKO', '深咖色圆领九分袖女士连衣裙', '￥1,800', '￥3,000', '../img/list/34.jpg', '2017-06-15 21:01:43');
INSERT INTO `product_list` VALUES ('37', 'MARIMEKKO', '深咖色圆领九分袖女士连衣裙', '￥1,800', '￥3,000', '../img/list/35.jpg', '2017-06-15 21:01:48');
INSERT INTO `product_list` VALUES ('38', 'MARIMEKKO', '深咖色圆领九分袖女士连衣裙', '￥1,800', '￥3,000', '../img/list/36.jpg', '2017-06-15 21:01:51');
INSERT INTO `product_list` VALUES ('39', 'MARIMEKKO', '深咖色圆领九分袖女士连衣裙', '￥1,800', '￥3,000', '../img/list/37.jpg', '2017-06-15 21:01:56');
INSERT INTO `product_list` VALUES ('40', 'MARIMEKKO', '深咖色圆领九分袖女士连衣裙', '￥1,800', '￥3,000', '../img/list/38.jpg', '2017-06-15 21:01:59');
INSERT INTO `product_list` VALUES ('41', 'MARIMEKKO', '深咖色圆领九分袖女士连衣裙', '￥1,800', '￥3,000', '../img/list/39.jpg', '2017-06-15 21:02:03');
INSERT INTO `product_list` VALUES ('42', 'MARIMEKKO', '深咖色圆领九分袖女士连衣裙', '￥1,800', '￥3,000', '../img/list/40.jpg', '2017-06-15 21:02:08');
INSERT INTO `product_list` VALUES ('43', 'MARIMEKKO', '深咖色圆领九分袖女士连衣裙', '￥1,800', '￥3,000', '../img/list/41.jpg', '2017-06-15 21:02:12');
INSERT INTO `product_list` VALUES ('44', 'MARIMEKKO', '深咖色圆领九分袖女士连衣裙', '￥1,800', '￥3,000', '../img/list/42.jpg', '2017-06-15 21:02:18');
INSERT INTO `product_list` VALUES ('45', 'MARIMEKKO', '深咖色圆领九分袖女士连衣裙', '￥1,800', '￥3,000', '../img/list/43.jpg', '2017-06-15 21:02:22');
INSERT INTO `product_list` VALUES ('46', 'MARIMEKKO', '深咖色圆领九分袖女士连衣裙', '￥1,800', '￥3,000', '../img/list/44.jpg', '2017-06-15 21:02:28');
INSERT INTO `product_list` VALUES ('47', 'MARIMEKKO', '深咖色圆领九分袖女士连衣裙', '￥1,800', '￥3,000', '../img/list/45.jpg', '2017-06-15 21:02:32');
INSERT INTO `product_list` VALUES ('48', 'MARIMEKKO', '深咖色圆领九分袖女士连衣裙', '￥1,800', '￥3,000', '../img/list/46.jpg', '2017-06-15 21:02:36');
INSERT INTO `product_list` VALUES ('49', 'MARIMEKKO', '深咖色圆领九分袖女士连衣裙', '￥1,800', '￥3,000', '../img/list/47.jpg', '2017-06-15 21:02:39');
INSERT INTO `product_list` VALUES ('50', 'MARIMEKKO', '深咖色圆领九分袖女士连衣裙', '￥1,800', '￥3,000', '../img/list/48.jpg', '2017-06-15 21:02:42');
INSERT INTO `product_list` VALUES ('51', 'MARIMEKKO', '深咖色圆领九分袖女士连衣裙', '￥1,800', '￥3,000', '../img/list/0.jpg', '2017-06-15 21:08:41');
INSERT INTO `product_list` VALUES ('52', 'MARIMEKKO', '深咖色圆领九分袖女士连衣裙', '￥1,800', '￥3,000', '../img/list/2.jpg', '2017-06-15 21:08:41');
INSERT INTO `product_list` VALUES ('53', 'MARIMEKKO', '深咖色圆领九分袖女士连衣裙', '￥1,800', '￥3,000', '../img/list/1.jpg', '2017-06-15 21:08:41');
INSERT INTO `product_list` VALUES ('54', 'MARIMEKKO', '深咖色圆领九分袖女士连衣裙', '￥1,800', '￥3,000', '../img/list/3.jpg', '2017-06-15 21:08:41');
INSERT INTO `product_list` VALUES ('55', 'MARIMEKKO', '深咖色圆领九分袖女士连衣裙', '￥1,800', '￥3,000', '../img/list/4.jpg', '2017-06-15 21:08:41');
INSERT INTO `product_list` VALUES ('56', 'MARIMEKKO', '深咖色圆领九分袖女士连衣裙', '￥1,800', '￥3,000', '../img/list/5.jpg', '2017-06-15 21:08:41');
INSERT INTO `product_list` VALUES ('57', 'MARIMEKKO', '深咖色圆领九分袖女士连衣裙', '￥1,800', '￥3,000', '../img/list/6.jpg', '2017-06-15 21:08:41');
INSERT INTO `product_list` VALUES ('58', 'MARIMEKKO', '深咖色圆领九分袖女士连衣裙', '￥1,800', '￥3,000', '../img/list/7.jpg', '2017-06-15 21:08:41');
INSERT INTO `product_list` VALUES ('59', 'MARIMEKKO', '深咖色圆领九分袖女士连衣裙', '￥1,800', '￥3,000', '../img/list/8.jpg', '2017-06-15 21:08:41');
INSERT INTO `product_list` VALUES ('60', 'MARIMEKKO', '深咖色圆领九分袖女士连衣裙', '￥1,800', '￥3,000', '../img/list/9.jpg', '2017-06-15 21:08:41');
INSERT INTO `product_list` VALUES ('61', 'MARIMEKKO', '深咖色圆领九分袖女士连衣裙', '￥1,800', '￥3,000', '../img/list/10.jpg', '2017-06-15 21:08:41');
INSERT INTO `product_list` VALUES ('62', 'MARIMEKKO', '深咖色圆领九分袖女士连衣裙', '￥1,800', '￥3,000', '../img/list/11.jpg', '2017-06-15 21:08:41');
INSERT INTO `product_list` VALUES ('63', 'MARIMEKKO', '深咖色圆领九分袖女士连衣裙', '￥1,800', '￥3,000', '../img/list/11.jpg', '2017-06-15 21:08:41');
INSERT INTO `product_list` VALUES ('64', 'MARIMEKKO', '深咖色圆领九分袖女士连衣裙', '￥1,800', '￥3,000', '../img/list/12.jpg', '2017-06-15 21:08:41');
INSERT INTO `product_list` VALUES ('65', 'MARIMEKKO', '深咖色圆领九分袖女士连衣裙', '￥1,800', '￥3,000', '../img/list/13.jpg', '2017-06-15 21:08:41');
INSERT INTO `product_list` VALUES ('66', 'MARIMEKKO', '深咖色圆领九分袖女士连衣裙', '￥1,800', '￥3,000', '../img/list/14.jpg', '2017-06-15 21:08:41');
INSERT INTO `product_list` VALUES ('67', 'MARIMEKKO', '深咖色圆领九分袖女士连衣裙', '￥1,800', '￥3,000', '../img/list/15.jpg', '2017-06-15 21:08:41');
INSERT INTO `product_list` VALUES ('68', 'MARIMEKKO', '深咖色圆领九分袖女士连衣裙', '￥1,800', '￥3,000', '../img/list/16.jpg', '2017-06-15 21:08:41');
INSERT INTO `product_list` VALUES ('69', 'MARIMEKKO', '深咖色圆领九分袖女士连衣裙', '￥1,800', '￥3,000', '../img/list/17.jpg', '2017-06-15 21:08:41');
INSERT INTO `product_list` VALUES ('70', 'MARIMEKKO', '深咖色圆领九分袖女士连衣裙', '￥1,800', '￥3,000', '../img/list/18.jpg', '2017-06-15 21:08:41');
INSERT INTO `product_list` VALUES ('71', 'MARIMEKKO', '深咖色圆领九分袖女士连衣裙', '￥1,800', '￥3,000', '../img/list/19.jpg', '2017-06-15 21:08:41');
INSERT INTO `product_list` VALUES ('72', 'MARIMEKKO', '深咖色圆领九分袖女士连衣裙', '￥1,800', '￥3,000', '../img/list/20.jpg', '2017-06-15 21:08:41');
INSERT INTO `product_list` VALUES ('73', 'MARIMEKKO', '深咖色圆领九分袖女士连衣裙', '￥1,800', '￥3,000', '../img/list/21.jpg', '2017-06-15 21:08:41');
INSERT INTO `product_list` VALUES ('74', 'MARIMEKKO', '深咖色圆领九分袖女士连衣裙', '￥1,800', '￥3,000', '../img/list/22.jpg', '2017-06-15 21:08:41');
INSERT INTO `product_list` VALUES ('75', 'MARIMEKKO', '深咖色圆领九分袖女士连衣裙', '￥1,800', '￥3,000', '../img/list/23.jpg', '2017-06-15 21:08:41');
INSERT INTO `product_list` VALUES ('76', 'MARIMEKKO', '深咖色圆领九分袖女士连衣裙', '￥1,800', '￥3,000', '../img/list/26.jpg', '2017-06-15 21:09:04');
INSERT INTO `product_list` VALUES ('77', 'MARIMEKKO', '深咖色圆领九分袖女士连衣裙', '￥1,800', '￥3,000', '../img/list/27.jpg', '2017-06-15 21:09:04');
INSERT INTO `product_list` VALUES ('78', 'MARIMEKKO', '深咖色圆领九分袖女士连衣裙', '￥1,800', '￥3,000', '../img/list/28.jpg', '2017-06-15 21:09:04');
INSERT INTO `product_list` VALUES ('79', 'MARIMEKKO', '深咖色圆领九分袖女士连衣裙', '￥1,800', '￥3,000', '../img/list/29.jpg', '2017-06-15 21:09:04');
INSERT INTO `product_list` VALUES ('80', 'MARIMEKKO', '深咖色圆领九分袖女士连衣裙', '￥1,800', '￥3,000', '../img/list/30.jpg', '2017-06-15 21:09:04');
INSERT INTO `product_list` VALUES ('81', 'MARIMEKKO', '深咖色圆领九分袖女士连衣裙', '￥1,800', '￥3,000', '../img/list/31.jpg', '2017-06-15 21:09:04');
INSERT INTO `product_list` VALUES ('82', 'MARIMEKKO', '深咖色圆领九分袖女士连衣裙', '￥1,800', '￥3,000', '../img/list/32.jpg', '2017-06-15 21:09:04');
INSERT INTO `product_list` VALUES ('83', 'MARIMEKKO', '深咖色圆领九分袖女士连衣裙', '￥1,800', '￥3,000', '../img/list/33.jpg', '2017-06-15 21:09:04');
INSERT INTO `product_list` VALUES ('84', 'MARIMEKKO', '深咖色圆领九分袖女士连衣裙', '￥1,800', '￥3,000', '../img/list/34.jpg', '2017-06-15 21:09:04');
INSERT INTO `product_list` VALUES ('85', 'MARIMEKKO', '深咖色圆领九分袖女士连衣裙', '￥1,800', '￥3,000', '../img/list/35.jpg', '2017-06-15 21:09:04');
INSERT INTO `product_list` VALUES ('86', 'MARIMEKKO', '深咖色圆领九分袖女士连衣裙', '￥1,800', '￥3,000', '../img/list/36.jpg', '2017-06-15 21:09:04');
INSERT INTO `product_list` VALUES ('87', 'MARIMEKKO', '深咖色圆领九分袖女士连衣裙', '￥1,800', '￥3,000', '../img/list/37.jpg', '2017-06-15 21:09:04');
INSERT INTO `product_list` VALUES ('88', 'MARIMEKKO', '深咖色圆领九分袖女士连衣裙', '￥1,800', '￥3,000', '../img/list/38.jpg', '2017-06-15 21:09:04');
INSERT INTO `product_list` VALUES ('89', 'MARIMEKKO', '深咖色圆领九分袖女士连衣裙', '￥1,800', '￥3,000', '../img/list/39.jpg', '2017-06-15 21:09:04');
INSERT INTO `product_list` VALUES ('90', 'MARIMEKKO', '深咖色圆领九分袖女士连衣裙', '￥1,800', '￥3,000', '../img/list/40.jpg', '2017-06-15 21:09:04');
INSERT INTO `product_list` VALUES ('91', 'MARIMEKKO', '深咖色圆领九分袖女士连衣裙', '￥1,800', '￥3,000', '../img/list/41.jpg', '2017-06-15 21:09:04');
INSERT INTO `product_list` VALUES ('92', 'MARIMEKKO', '深咖色圆领九分袖女士连衣裙', '￥1,800', '￥3,000', '../img/list/42.jpg', '2017-06-15 21:09:04');
INSERT INTO `product_list` VALUES ('93', 'MARIMEKKO', '深咖色圆领九分袖女士连衣裙', '￥1,800', '￥3,000', '../img/list/43.jpg', '2017-06-15 21:09:04');
INSERT INTO `product_list` VALUES ('94', 'MARIMEKKO', '深咖色圆领九分袖女士连衣裙', '￥1,800', '￥3,000', '../img/list/44.jpg', '2017-06-15 21:09:04');
INSERT INTO `product_list` VALUES ('95', 'MARIMEKKO', '深咖色圆领九分袖女士连衣裙', '￥1,800', '￥3,000', '../img/list/45.jpg', '2017-06-15 21:09:04');
INSERT INTO `product_list` VALUES ('96', 'MARIMEKKO', '深咖色圆领九分袖女士连衣裙', '￥1,800', '￥3,000', '../img/list/46.jpg', '2017-06-15 21:09:04');
INSERT INTO `product_list` VALUES ('97', 'MARIMEKKO', '深咖色圆领九分袖女士连衣裙', '￥1,800', '￥3,000', '../img/list/47.jpg', '2017-06-15 21:09:04');
INSERT INTO `product_list` VALUES ('98', 'MARIMEKKO', '深咖色圆领九分袖女士连衣裙', '￥1,800', '￥3,000', '../img/list/28.jpg', '2017-06-15 21:09:33');
INSERT INTO `product_list` VALUES ('99', 'MARIMEKKO', '深咖色圆领九分袖女士连衣裙', '￥1,800', '￥3,000', '../img/list/29.jpg', '2017-06-15 21:09:33');
INSERT INTO `product_list` VALUES ('100', 'MARIMEKKO', '深咖色圆领九分袖女士连衣裙', '￥1,800', '￥3,000', '../img/list/30.jpg', '2017-06-15 21:09:33');
INSERT INTO `product_list` VALUES ('101', 'MARIMEKKO', '深咖色圆领九分袖女士连衣裙', '￥1,800', '￥3,000', '../img/list/31.jpg', '2017-06-15 21:09:33');
INSERT INTO `product_list` VALUES ('102', 'MARIMEKKO', '深咖色圆领九分袖女士连衣裙', '￥1,800', '￥3,000', '../img/list/32.jpg', '2017-06-15 21:09:33');

-- ----------------------------
-- Table structure for text
-- ----------------------------
DROP TABLE IF EXISTS `text`;
CREATE TABLE `text` (
  `id` int(6) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of text
-- ----------------------------

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `add_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('zhang', 'd41d8cd98f00b204e9800998ecf8427e', '2017-06-15 15:16:41');
INSERT INTO `user` VALUES ('zhangf', 'd41d8cd98f00b204e9800998ecf8427e', '2017-06-15 15:19:07');
INSERT INTO `user` VALUES ('zhanggao', '670b14728ad9902aecba32e22fa4f6bd', '2017-06-09 19:51:36');
INSERT INTO `user` VALUES ('zhangago', '96e79218965eb72c92a549dd5a330112', '2017-06-16 11:32:37');
