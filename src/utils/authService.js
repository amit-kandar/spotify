import axios from '../config/axios';
import { CHECK_EMAIL, LOGIN } from '../constant';

export const login = async (data, setIsLoading, isErr, navigate) => {
    if (isErr.email || isErr.password) {
        return;
    }

    try {
        setIsLoading(true);
        const response = await axios.post(LOGIN, data, { withCredentials: true });
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        console.log(response);
        navigate('/');
    } catch (error) {
        console.error(error);
    } finally {
        setIsLoading(false);
    }
};

export const checkEmailExists = async (email, setIsEmailExists, setEmailWarningText, Link) => {
    try {
        const response = await axios.post(CHECK_EMAIL, { email: email });

        if (response.data.exists) {
            setIsEmailExists(response.data.exists);
            setEmailWarningText(
                <>
                    This email is already linked to an existing account. To continue, {' '}
                    <Link to="/login" className="underline">log in</Link>
                </>
            );
        }
    } catch (error) {
        console.error('Error fetching email existence:', error);
        // Handle error as needed (e.g., show error message)
    }
}
