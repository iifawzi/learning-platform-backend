exports.student_token = (student_id,student_name,phone_number, role = "student")=>{
    return {
        student_id,
        student_name,
        phone_number,
        role,
    };
};

exports.teacher_token = (teacher_id, teacher_name,teacher_phone_number,role = "teacher")=>{
    return {
        teacher_id,
        teacher_name,
        teacher_phone_number,
        role,
    };
};