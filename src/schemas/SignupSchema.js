import * as Yup from 'yup';

const SignupSchema = [
    Yup.object().shape({
        email: Yup.string().email("This email is invalid. Make sure it's written like example@email.com").required('Email is required')
    }),

    Yup.object().shape({
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required')
    }),

    Yup.object().shape({
        name: Yup.string().required('Name is required'),
        year: Yup.number()
            .integer("Please enter the year of your birth date using four digits (e.g., 1990)")
            .min(1900, "Please enter a birth year from 1900 onwards.")
            .max(2010, "You're too young to create a Spotify account.")
            .required('Year is required'),
        month: Yup.number().min(1, 'Month must be between 1 and 12').max(12, 'Month must be between 1 and 12').required('Month is required'),
        day: Yup.number().min(1, 'Day must be between 1 and 31').max(31, 'Day must be between 1 and 31').required('Day is required'),
        gender: Yup.string().oneOf(['man', 'woman', 'non-binary', 'somethingElse', 'preferNotToSay'], 'Invalid gender').required('Gender is required')
    })
]

export default SignupSchema;
