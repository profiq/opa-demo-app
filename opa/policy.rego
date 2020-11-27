package demo.opa

default allow = false

allow {
	input.method == "OPTIONS"
}

allow {
	input.method == "POST"
    input.path == "/auth"
}

allow {
	input.method == "GET"
    input.path == "/all_courses"
}

allow {
	input.method == "POST"
    input.path == "/course_detail"
}

allow {
    input.path == "/enroll_course"
}

allow {
	input.method == "POST"
	input.path == "/course_update"
	teacher_teaching_course
}

allow {
	input.method == "GET"
    input.path == "/all_users"
}

allow {
	input.method == "POST"
    input.path == "/user_detail"
}

allow {
    input.path == "/enroll_course"
}

allow {
    input.path == "/enroll_course_endpoint"
    student_have_free_time_slot
    not course_is_full
}

course_is_full {
    course_capacity <= count(course_students_enrolled)
}

course_students_enrolled = students {
    students := [ st | (data.users[st].course[_] == input.course)]
}

course_capacity = capacity {
    no_teachers := count(data.courses[input.course].teachers)
    capacity := no_teachers * 2
}

student_have_free_time_slot {
	user_is_student
	not match_any_hours
}

match_any_hours {
    student_courses := data.users[token.payload.user].course
    student_timetable := data.courses[student_courses[_]].time_slot
    data.courses[input.course].time_slot[_] == student_timetable[_]
}

teacher_teaching_course {
    user_is_teacher
    data.courses[input.course].teachers[_] == token.payload.user
}

user_is_student {
    data.users[token.payload.user].role == "student"
}

user_is_teacher {
    data.users[token.payload.user].role == "teacher"
}

token = {"payload": payload} {
    io.jwt.verify_hs256(input.token, "secret")
    [header, payload, signature] := io.jwt.decode(input.token)
}