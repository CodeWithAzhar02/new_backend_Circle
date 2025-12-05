
async function getCourseId() {
    try {
        const response = await fetch('http://localhost:5000/api/v1/course/getAllCourses');
        const data = await response.json();
        if (data.success && data.data.length > 0) {
            console.log('VALID_COURSE_ID:', data.data[0]._id);
        } else {
            console.log('No courses found.');
        }
    } catch (error) {
        console.error('Error fetching courses:', error.message);
    }
}

getCourseId();
