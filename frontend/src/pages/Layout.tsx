import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import useUsers from '../hooks/useUsers';
import useCourses from '../hooks/useCourses';
import UsersList from '../components/UsersList';
import UserButtons from '../components/UserButtons';
import CoursesList from '../components/CoursesList';
import CourseButtons from '../components/CourseButtons';
import DetailForm from '../components/DetailForm';
import APIResponseBox from '../components/APIResponseBox';

const Layout: React.FC = () => {
    const { users } = useUsers();
    const { courses } = useCourses();
    const [selectedCourseIndex, setSelectedCourseIndex] = React.useState<
        number | null
    >(null);

    return (
        <Grid
            container
            spacing={2}
            direction="row"
            justify="center"
            alignItems="center"
        >
            {users.length > 0 && courses.length > 0 ? (
                <>
                    <Grid item xs={6}>
                        <Grid container item xs={12} spacing={2}>
                            <Grid item xs={6}>
                                <UsersList />
                            </Grid>
                            <Grid item xs={6}>
                                <UserButtons />
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            item
                            xs={12}
                            spacing={2}
                            style={{ marginTop: '5pt' }}
                        >
                            <Grid item xs={6}>
                                <CoursesList
                                    selectedCourseIndex={selectedCourseIndex}
                                    setSelectedCourseIndex={
                                        setSelectedCourseIndex
                                    }
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <CourseButtons
                                    selectedCourseIndex={selectedCourseIndex}
                                />
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} spacing={2}>
                            <Grid item xs={12}>
                                <APIResponseBox />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        <DetailForm />
                    </Grid>
                </>
            ) : (
                <Grid item xs={12}>
                    Data not loaded
                </Grid>
            )}
        </Grid>
    );
};

export default Layout;
