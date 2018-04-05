import axios from 'axios';

export const userService {
	login,
	logout,
	register,
	getAll,
	getById,
	update,
	delete: _delete
}

function empLogin(username, password) {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type' : 'application/json' },
		body: JSON.stringify({username, password})
	}

    axios({
    	method: 'post',
    	url: 'api/EmployeeUser/authenticate',
    	data: requestOptions    
    })
    .get(`api/EmployeeType/LookUpEmployeeType`)
            .then(response => {
                dispatch({ type: 'FETCH_EMPLOYEE_TYPE', employeeTypeList: response.data });
            })
        }
    },
}
