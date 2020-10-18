exports.student_token = (student_id,student_name,phone_number)=>{
    return {
        student_id,
        student_name,
        phone_number,
        role: "student"
    }
}