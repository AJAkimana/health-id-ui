import gql from 'graphql-tag';

export const GET_ALL_SUPPLIERS = (pageCount, pageNumber) => gql`
query{
  allSuppliers(pageCount: ${pageCount}, pageNumber: ${pageNumber}){
    id
    name
    rating
    commentary
    user{
      id
    }
    isApproved
    tier {
      name
    }
    suppliernoteSet{
      note
    }
  }
  totalSuppliersPagesCount
}
`;
export const FILTER_SUPPLIERS = (type, value) => {
  switch (type) {
  case 'status': {
    return gql`
      query {
        filterSuppliers(isApproved: ${value}) {
          edges {
            node {
              id
              name
              mobileNumber
              rating
              addressLine1
              addressLine2
              isApproved
              creditDays
              user{
                id
              }
              paymentTerms {
                id
              }
              city {
                name
                country {
                  name
                }
              }
              suppliernoteSet {
                note
              }
              tier {
                name
              }
              commentary
            }
          }
        }
      }
    `;
  }
  case 'search': {
    return gql`
   query {
     filterSuppliers(name_Icontains: "${value}") {
       edges {
         node {
           id
           name
           mobileNumber
           rating
           addressLine1
           addressLine2
           isApproved
           creditDays
           user{
            id
           }
           paymentTerms {
             id
           }
           city {
             name
             country {
               name
             }
           }
           suppliernoteSet {
             note
           }
           tier {
             name
           }
           commentary
         }
       }
     }
   }
 `;
  }
  default:
    return null;
  }
};
