import React from 'react';
import { shallow } from 'enzyme';
import { Categories } from '../../components/main_setup/productCategories';

describe("Product Categories", () => {
  const wrapper = shallow(
    <Categories
      createProductCategory={jest.fn(
        () => Promise.resolve({
          data: {
            createProductCategory: {
              productCategory: {
                name: "Test ADD new"
              }
            }
          }
        })
      )}
      editProductCategories={jest.fn(
        () => Promise.resolve({
          data: {
            editProductCategory: {
              productCategory: {
                name: "Test Category1-handleChangeUPDATE"
              }
            }
          }
        })
      )}
      deleteProductCategory={jest.fn(
        () => Promise.resolve({
          data: {
            deleteProductCategory: {
              message: "Deleted Product Test"
            }
          }
        })
      )}
      categories={
        {
          productCategories: [
            {
              id: 1,
              name: 'Test Category1',
              markup: 10,
              isVatApplicable: false,
              loyaltyWeight: 21
            },
            {
              id: 2,
              name: 'Test Category2',
              markup: 10,
              isVatApplicable: false,
              loyaltyWeight: 21
            },
            {
              id: 3,
              name: 'Test Category3',
              markup: 10,
              isVatApplicable: false,
              loyaltyWeight: 21
            }
          ],
          refetch: jest.fn()
        }
      }
    />
  )

  it("Should render the categories component", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("Should call handleOpenModal", () => {
    const spy = jest.spyOn(wrapper.instance(), 'handleOpenModal');
    const customCategory = {
      name: 'test',
      salesMarkup: 10,
      isVat: false,
      loyalty: 21
    }

    wrapper.instance().handleOpenModal(customCategory)()

    expect(spy).toHaveBeenCalled();
    expect(wrapper.instance().state.selectedCategory).toEqual(customCategory);
    expect(wrapper.instance().state.openModal).toBeTruthy();
  });

  it("Should call handleCloseModal", () => {
    const spy = jest.spyOn(wrapper.instance(), 'handleCloseModal');
    wrapper.instance().handleCloseModal()

    expect(spy).toHaveBeenCalled();
    expect(wrapper.instance().state.openModal).toBeFalsy();
  })

  it("Should call handleAddCategory", () => {
    const spy = jest.spyOn(wrapper.instance(), 'handleAddCategory');

    wrapper.instance().handleAddCategory('name')(
      {
        target: {
          value: "Test ADD new"
        }
      }
    )
    wrapper.instance().handleAddCategory('loyalty')(
      {
        target: {
          value: "12"
        }
      }
    )
    wrapper.instance().handleAddCategory('isVat')(
      {
        target: {
          value: false
        }
      }
    )
    wrapper.instance().handleAddCategory('salesMarkup')(
      {
        target: {
          value: "34"
        }
      }
    )

    expect(spy).toHaveBeenCalledTimes(4)
    expect(wrapper.instance().state.addCategory).toEqual({
      name: "Test ADD new",
      salesMarkup: 34,
      isVat: false,
      loyalty: 12
    })
  })

  it("Should call handleChange", () => {
    const spy = jest.spyOn(wrapper.instance(), 'handleChange');

    wrapper.instance().handleChange(
      {
        field: 'name',
        category: 1
      }
    )(
      {
        target: {
          value: "Test Category1-handleChangeUPDATE"
        }
      }
    )
    wrapper.instance().handleChange(
      {
        field: 'markup',
        category: 1
      }
    )(
      {
        target: {
          value: 100
        }
      }
    )
    wrapper.instance().handleChange(
      {
        field: 'isVatApplicable',
        category: 1
      }
    )(
      {
        target: {
          value: true
        }
      }
    )
    wrapper.instance().handleChange(
      {
        field: 'loyaltyWeight',
        category: 1
      }
    )(
      {
        target: {
          value: 42
        }
      }
    )

    const state = wrapper.instance().state
    expect(spy).toHaveBeenCalled()
    expect(state.updates).toEqual(expect.arrayContaining([1]))
    expect(state.categories[0].name).toBe("Test Category1-handleChangeUPDATE")
    expect(state.categories[0].markup).toBe(100)
    expect(state.categories[0].isVatApplicable).toBe(true)
    expect(state.categories[0].loyaltyWeight).toBe(42)
  });

  it("Should call handleConfirmChanges", () => {
    const spy = jest.spyOn(wrapper.instance(), 'handleConfirmChanges');
    const spy2 = jest.spyOn(wrapper.instance(), 'handleUpdates');

    wrapper.instance().handleConfirmChanges();

    const state = wrapper.instance().state;
    expect(spy).toHaveBeenCalled()
    expect(spy2).toHaveBeenCalledTimes(1)
    expect(state.updates).toEqual(expect.arrayContaining([]))
    expect(state.categories[0].name).toBe("Test Category1-handleChangeUPDATE")
  })

  it("Should call handleShowInput", () => {
    const spy = jest.spyOn(wrapper.instance(), 'handleShowInput')

    const beforeState = wrapper.instance().state.newCategory
    wrapper.instance().handleShowInput()
    const afterState = wrapper.instance().state.newCategory

    expect(spy).toBeCalled()
    expect(beforeState).not.toBe(afterState)
    expect(beforeState).toBe(!afterState)
  })

  it("Should call handleDelete", () => {
    const spy = jest.spyOn(wrapper.instance(), 'handleDelete')

    wrapper.instance().handleDelete(1)

    const state = wrapper.instance().state
    expect(spy).toHaveBeenCalled()
  })
});

describe("Product Categories - Errors", () => {

  const wrapper = shallow(
    <Categories
      createProductCategory={jest.fn(
        () => Promise.reject({
          graphQLErrors: ['Some CreateError 1', 'Some Error 2']
        })
      )}
      editProductCategories={jest.fn(
        () => Promise.reject({
          graphQLErrors: ['Some EditError 1', 'Some Error 2']
        })
      )}
      deleteProductCategory={jest.fn(
        () => Promise.reject({
          graphQLErrors: ['Some DeleteError 1', 'Some Error 2']
        })
      )}
      categories={
        {
          productCategories: [
            {
              id: 1,
              name: 'Test Category1',
              markup: 10,
              isVatApplicable: false,
              loyaltyWeight: 21
            },
            {
              id: 2,
              name: 'Test Category2',
              markup: 10,
              isVatApplicable: false,
              loyaltyWeight: 21
            },
            {
              id: 3,
              name: 'Test Category3',
              markup: 10,
              isVatApplicable: false,
              loyaltyWeight: 21
            }
          ],
          refetch: jest.fn()
        }
      }
    />
  )

  it("Should catch errors when promise rejects", () => {
    const spy = jest.spyOn(wrapper.instance(), 'handleConfirmChanges');
    const spy2 = jest.spyOn(wrapper.instance(), 'handleCreate');
    const spy3 = jest.spyOn(wrapper.instance(), 'handleUpdates');
    const spy4 = jest.spyOn(wrapper.instance(), 'handleDelete');

    wrapper.setState(
      {
        newCategory: true,
        updates: [1,1,2]
      }
    )
    wrapper.instance().handleConfirmChanges();
    wrapper.instance().handleDelete(3)

    const state = wrapper.instance().state;
    expect(spy).toHaveBeenCalled()
    expect(spy2).toHaveBeenCalled()
    expect(spy3).toHaveBeenCalled()
    expect(spy4).toHaveBeenCalled()
  })
})