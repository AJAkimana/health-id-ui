import gql from 'graphql-tag';

const UPDATE_USER_INFO = gql`
    query {
        me {
            id
            firstName
            lastName
            username
            email
            mobileNumber
            birthday
            profileImage
            jobTitle
            startingDate
            role{
              name
            }
            users{
              id
              name 
            }       
    }
}
`;

export default UPDATE_USER_INFO;
