import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import api from '../services/api';
import { Link } from 'react-router-dom';
import { getUser } from '../services/auth';
import SuccessModal from '../components/SuccessModal';

const CategoriesWrapper = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: auto;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 2rem;
`;

const CategoryCard = styled.div`
  background-color: ${({ theme }) => theme.colors.light};
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.colors.primary};
  }

  a {
    color: ${({ theme }) => theme.colors.secondary};
    text-decoration: none;
    font-weight: bold;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const ActionsWrapper = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const EditButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  font-family: ${({ theme }) => theme.fonts.main};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.light};
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const DeleteButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  font-family: ${({ theme }) => theme.fonts.main};
  background-color: ${({ theme }) => theme.colors.danger};
  color: ${({ theme }) => theme.colors.light};
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.dangerDark};
  }
`;

const Form = styled.form`
  display: grid;
  grid-gap: 1.5rem;
  padding: 2rem;
  background-color: ${({ theme }) => theme.colors.light};
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const Input = styled.input`
  padding: 1rem;
  font-size: 1rem;
  font-family: ${({ theme }) => theme.fonts.main};
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.backgroundLight};

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    outline: none;
    box-shadow: 0 0 4px ${({ theme }) => theme.colors.primary};
  }
`;

const Button = styled.button`
  padding: 1rem;
  font-size: 1rem;
  font-family: ${({ theme }) => theme.fonts.main};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.light};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const EmptyState = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.muted};
  margin-top: 2rem;
`;

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState(null);
  const user = getUser();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editCategoryId) {
        await api.put(`/categories/${editCategoryId}`, { name: categoryName });
        setEditCategoryId(null);
      } else {
        await api.post('/categories', { name: categoryName });
      }
      setCategoryName('');
      setModalOpen(true);
      fetchCategories();
    } catch (error) {
      console.error('Error saving category:', error);
    }
  };

  const handleEdit = (category) => {
    setEditCategoryId(category._id);
    setCategoryName(category.name);
  };

  const handleDelete = async (categoryId) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await api.delete(`/categories/${categoryId}`);
        fetchCategories();
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    }
  };

  return (
    <CategoriesWrapper>
      <Title>Categories</Title>
      {user && user.role === 'admin' && (
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder={editCategoryId ? 'Edit Category Name' : 'New Category Name'}
            value={categoryName}
            required
            onChange={(e) => setCategoryName(e.target.value)}
          />
          <Button type="submit">{editCategoryId ? 'Update Category' : 'Add Category'}</Button>
        </Form>
      )}
      {categories.length > 0 ? (
        categories.map((category) => (
          <CategoryCard key={category._id}>
            <h3>{category.name}</h3>
            <Link to={`/categories/${category._id}/jobs`}>View Jobs</Link>
            {user && user.role === 'admin' && (
              <ActionsWrapper>
                <EditButton onClick={() => handleEdit(category)}>Edit</EditButton>
                <DeleteButton onClick={() => handleDelete(category._id)}>Delete</DeleteButton>
              </ActionsWrapper>
            )}
          </CategoryCard>
        ))
      ) : (
        <EmptyState>No categories available.</EmptyState>
      )}
      <SuccessModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        message={editCategoryId ? 'Category updated successfully!' : 'Category added successfully!'}
      />
    </CategoriesWrapper>
  );
};

export default Categories;
