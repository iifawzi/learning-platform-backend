CREATE TABLE `students` (
  `student_id` int PRIMARY KEY AUTO_INCREMENT,
  `student_name` varchar(255),
  `phone_number` varchar(255),
  `password` varchar(255),
  `number_verified` boolean,
  `account_status` boolean,
  `subscription_end_at` date,
  `refresh_token` varchar(255)
);

CREATE TABLE `classes` (
  `class_id` int AUTO_INCREMENT,
  `creator_teacher_id` int AUTO_INCREMENT,
  `class_name` varchar(255),
  `class_description` varchar(255),
  `class_code` int,
  `join_using` ENUM ('code', 'request'),
  PRIMARY KEY (`class_id`, `creator_teacher_id`)
);

CREATE TABLE `students_classes` (
  `students_classes_id` int PRIMARY KEY AUTO_INCREMENT,
  `student_id` int,
  `class_id` int
);

CREATE TABLE `announcements` (
  `announcement_id` int PRIMARY KEY AUTO_INCREMENT,
  `announcement_title` varchar(255),
  `announcement_content` text
);

CREATE TABLE `announcements_classes` (
  `announcements_classes_id` int,
  `announcement_id` int,
  `class_id` int
);

CREATE TABLE `exams` (
  `exam_id` int PRIMARY KEY AUTO_INCREMENT,
  `class_id` int,
  `available_from` datetime,
  `available_to` datetime,
  `duration` int,
  `exam_full_mark` int,
  `pass_mark` int
);

CREATE TABLE `exams_classes` (
  `exams_classes_id` int PRIMARY KEY AUTO_INCREMENT,
  `exam_id` int,
  `class_id` int
);

CREATE TABLE `questions` (
  `question_id` int PRIMARY KEY AUTO_INCREMENT,
  `exam_id` int,
  `question` text,
  `question_type` ENUM ('mcq', 'written'),
  `choice_1` text,
  `choice_2` text,
  `choice_3` text,
  `choice_4` text,
  `correct_choice_number` int,
  `question_mark` float
);

CREATE TABLE `taken_exams` (
  `taken_exam_id` int PRIMARY KEY AUTO_INCREMENT,
  `taken_exam_status` ENUM ('running', 'corrected', 'not_corrected'),
  `exam_id` int,
  `student_id` int,
  `taken_exam_mark` int
);

CREATE TABLE `answers` (
  `answer_id` int PRIMARY KEY AUTO_INCREMENT,
  `taken_exam_id` int,
  `question_id` int,
  `choice_id` int,
  `answer` text,
  `answer_mark` float
);

CREATE TABLE `teachers` (
  `teacher_id` int PRIMARY KEY AUTO_INCREMENT,
  `teacher_name` varchar(255),
  `teacher_phone_number` varchar(255),
  `password` varchar(255),
  `teacher_refresh_token` varchar(255),
  `teacher_role` ENUM ('principle', 'teacher')
);

CREATE TABLE `teachers_classes` (
  `teachers_classes_id` int PRIMARY KEY AUTO_INCREMENT,
  `teacher_id` int,
  `class_id` int
);

CREATE TABLE `videos` (
  `video_id` int PRIMARY KEY AUTO_INCREMENT,
  `video_referance` varchar(255),
  `confirmation_exam_id` int,
  `prerequisite_exam_id` int
);

CREATE TABLE `serieses` (
  `series_id` int PRIMARY KEY AUTO_INCREMENT,
  `serieses_name` varchar(255),
  `serieses_description` text
);

CREATE TABLE `serieses_classes` (
  `serieses_classes_id` int PRIMARY KEY AUTO_INCREMENT,
  `class_id` int,
  `series_id` int
);

CREATE TABLE `serieses_videos` (
  `series_video_id` int PRIMARY KEY AUTO_INCREMENT,
  `series_id` int,
  `video_id` int,
  `order_number` int
);

CREATE TABLE `students_videos` (
  `student_video_id` int PRIMARY KEY AUTO_INCREMENT,
  `video_id` int,
  `student_id` int,
  `watched` boolean
);

ALTER TABLE `students_classes` ADD FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`);

ALTER TABLE `students_classes` ADD FOREIGN KEY (`class_id`) REFERENCES `classes` (`class_id`);

ALTER TABLE `classes` ADD FOREIGN KEY (`creator_teacher_id`) REFERENCES `teachers` (`teacher_id`);

ALTER TABLE `announcements_classes` ADD FOREIGN KEY (`announcement_id`) REFERENCES `announcements` (`announcement_id`);

ALTER TABLE `announcements_classes` ADD FOREIGN KEY (`class_id`) REFERENCES `classes` (`class_id`);

ALTER TABLE `exams_classes` ADD FOREIGN KEY (`class_id`) REFERENCES `classes` (`class_id`);

ALTER TABLE `exams_classes` ADD FOREIGN KEY (`exam_id`) REFERENCES `exams` (`exam_id`);

ALTER TABLE `questions` ADD FOREIGN KEY (`exam_id`) REFERENCES `exams` (`exam_id`);

ALTER TABLE `taken_exams` ADD FOREIGN KEY (`exam_id`) REFERENCES `exams` (`exam_id`);

ALTER TABLE `taken_exams` ADD FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`);

ALTER TABLE `answers` ADD FOREIGN KEY (`taken_exam_id`) REFERENCES `taken_exams` (`taken_exam_id`);

ALTER TABLE `answers` ADD FOREIGN KEY (`question_id`) REFERENCES `questions` (`question_id`);

ALTER TABLE `teachers_classes` ADD FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`teacher_id`);

ALTER TABLE `teachers_classes` ADD FOREIGN KEY (`class_id`) REFERENCES `classes` (`class_id`);

ALTER TABLE `videos` ADD FOREIGN KEY (`confirmation_exam_id`) REFERENCES `exams` (`exam_id`);

ALTER TABLE `videos` ADD FOREIGN KEY (`prerequisite_exam_id`) REFERENCES `exams` (`exam_id`);

ALTER TABLE `serieses_classes` ADD FOREIGN KEY (`class_id`) REFERENCES `classes` (`class_id`);

ALTER TABLE `serieses_classes` ADD FOREIGN KEY (`series_id`) REFERENCES `serieses` (`series_id`);

ALTER TABLE `serieses_videos` ADD FOREIGN KEY (`series_id`) REFERENCES `serieses` (`series_id`);

ALTER TABLE `serieses_videos` ADD FOREIGN KEY (`video_id`) REFERENCES `videos` (`video_id`);

ALTER TABLE `students_videos` ADD FOREIGN KEY (`video_id`) REFERENCES `videos` (`video_id`);

ALTER TABLE `students_videos` ADD FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`);

