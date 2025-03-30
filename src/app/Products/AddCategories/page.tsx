"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Box, TextField, Button, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

export default function CategoryManagement() {
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const [categoryName, setCategoryName] = useState("");
    const [categories, setCategories] = useState([
        { id: "cat1", name: "Laptop 17" },
        { id: "cat2", name: "Laptop 18" },
    ]);
    const [editingCategory, setEditingCategory] = useState<{ id: string; name: string } | null>(null);
    const [darkMode, setDarkMode] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const handleAddCategory = () => {
        if (categoryName.trim() !== "") {
            if (editingCategory) {
                // Update existing category
                const updatedCategories = categories.map((category) =>
                    category.id === editingCategory.id ? { ...category, name: categoryName } : category
                );
                setCategories(updatedCategories);
                setEditingCategory(null); // Clear editing state
            } else {
                // Add new category
                const newCategory = {
                    id: `cat${categories.length + 1}`,
                    name: categoryName,
                };
                setCategories([...categories, newCategory]);
            }
            setCategoryName(""); // Clear the input field
        }
    };

    const handleDeleteCategory = (id: string) => {
        setCategories(categories.filter((category) => category.id !== id));
    };

    const handleEditCategory = (category: { id: string; name: string }) => {
        setEditingCategory(category); // Set the category being edited
        setCategoryName(category.name); // Populate the form with the category name
    };

    const handleCancelEdit = () => {
        setEditingCategory(null); // Clear editing state
        setCategoryName(""); // Clear the input field
    };

    return (
        <div className={`flex min-h-screen ${darkMode ? 'dark' : ''}`}>
            {isSidebarVisible && <Sidebar />}
            <div className="flex-1 transition-all">
                <Header
                    onMenuClick={toggleSidebar}
                    onThemeToggle={toggleDarkMode}
                    darkMode={darkMode}
                />
                <div className="p-4">
                    <div className="flex items-center text-gray-500 dark:text-gray-300">
                        <h2 className="text-2xl font-bold mb-4">Category Management</h2>
                    </div>
                    <div className="p-6 bg-background text-gray-500 dark:text-gray-300 rounded-lg shadow-md dark:bg-gray-800">
                        <Paper sx={{ p: 4, mb: 4 }}>
                            <Typography variant="h6" gutterBottom>
                                {editingCategory ? "Edit Category" : "Add Category"}
                            </Typography>
                            <Box component="form" noValidate autoComplete="off" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                <TextField
                                    label="Category Name"
                                    value={categoryName}
                                    onChange={(e) => setCategoryName(e.target.value)}
                                    fullWidth
                                />
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                                    <Button variant="contained" color="primary" onClick={handleAddCategory}>
                                        {editingCategory ? "Update" : "Add"}
                                    </Button>
                                    {editingCategory && (
                                        <Button variant="outlined" color="secondary" onClick={handleCancelEdit}>
                                            Cancel
                                        </Button>
                                    )}
                                </Box>
                            </Box>
                        </Paper>

                        <Paper sx={{ p: 4 }}>
                            <Typography variant="h6" gutterBottom>
                                View Categories
                            </Typography>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Id</TableCell>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {categories.map((category) => (
                                            <TableRow key={category.id}>
                                                <TableCell>{category.id}</TableCell>
                                                <TableCell>{category.name}</TableCell>
                                                <TableCell sx={{ display: 'flex', gap: 1 }}>
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        size="small"
                                                        onClick={() => handleEditCategory(category)}
                                                    >
                                                        Update
                                                    </Button>
                                                    <Button
                                                        variant="contained"
                                                        color="error"
                                                        size="small"
                                                        onClick={() => handleDeleteCategory(category.id)}
                                                    >
                                                        Delete
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </div>
                </div>
            </div>
        </div>
    );
}