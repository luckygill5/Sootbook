import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, TextField, InputAdornment, Typography, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import CircleRightArrow from '../../assets/images/circle-right-arrow.svg';
import CircleLeftArrow from '../../assets/images/circle-left-arrow.svg';

const CategoryList = ({
    listName,
    className = '',
    categoryList = [],
    setSelected = null,
    selectedCat = '',
    toggleShowUpdateForm,
    setEditCategory,
    valueName
}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [items, setItems] = useState(Object.values(categoryList));
    const filteredItems = items.filter(item => item[valueName].toLowerCase().includes(searchQuery.toLowerCase()));

    const handleEdit = item => {
        setEditCategory(item);
        toggleShowUpdateForm();
    };

    const handleSearchChange = event => {
        setSearchQuery(event.target.value);
    };

    const handleDelete = id => {
        console.log('Delete item', id);
    };

    useEffect(() => {
        setItems(Object.values(categoryList));
    }, [categoryList]);

    return (
        <div className={`categoryListWrapper ${className}`}>
            <Box
                sx={{
                    maxWidth: 500,
                    margin: '0 auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                }}
            >
                <div className='listHeader'>
                    <Typography variant='h6' component='h2'>
                        {listName}
                    </Typography>
                    <TextField
                        label='Search'
                        variant='outlined'
                        fullWidth
                        value={searchQuery}
                        onChange={handleSearchChange}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position='start'>
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </div>
                <Box sx={{ maxHeight: '50vh', overflowY: 'auto' }}>
                    <List>
                        {filteredItems?.length > 0 ? (
                            filteredItems.map(item => (
                                <ListItem key={item.id} divider>
                                    <ListItemText primary={item[valueName]} />
                                    <ListItemSecondaryAction>
                                        <IconButton edge='end' aria-label='edit' onClick={() => handleEdit(item)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton edge='end' aria-label='delete' onClick={() => handleDelete(item.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                        <IconButton
                                            edge='end'
                                            aria-label='arrow'
                                            onClick={() => {
                                                if (selectedCat === item.id) {
                                                    setSelected && setSelected('');
                                                } else {
                                                    setSelected && setSelected(item.id);
                                                }
                                            }}
                                        >
                                            <img src={selectedCat === item.id ? CircleLeftArrow : CircleRightArrow} />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))
                        ) : (
                            <ListItem>
                                <ListItemText primary='No results found' />
                            </ListItem>
                        )}
                    </List>
                </Box>
            </Box>
        </div>
    );
};

export default CategoryList;
