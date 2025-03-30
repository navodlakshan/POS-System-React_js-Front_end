"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Box, TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography, Paper } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import SaveIcon from "@mui/icons-material/Save";

export default function AddProduct() {
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const [productName, setProductName] = useState("");
    const [category, setCategory] = useState("");
    const [productType, setProductType] = useState("Single Product");
    const [Color, setColor] = useState("");
    const [SKU, setSKU] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [darkMode, setDarkMode] = useState(false);

    // State for validation errors
    const [errors, setErrors] = useState({
        productName: "",
        category: "",
        price: "",
        image: "",
    });

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setImage(event.target.files[0]);
            setErrors((prev) => ({ ...prev, image: "" })); // Clear image error
        }
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            productName: "",
            category: "",
            price: "",
            image: "",
        };

        // Validate Product Name
        if (!productName.trim()) {
            newErrors.productName = "Product Name is required";
            isValid = false;
        }

        // Validate Category
        if (!category) {
            newErrors.category = "Category is required";
            isValid = false;
        }

        // Validate Price
        if (!price.trim()) {
            newErrors.price = "Price is required";
            isValid = false;
        } else if (isNaN(Number(price)) || Number(price) <= 0) {
            newErrors.price = "Price must be a valid number greater than 0";
            isValid = false;
        }

        // Validate Image
        if (!image) {
            newErrors.image = "Image is required";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            // Form is valid, proceed with submission
            console.log("Form submitted successfully!");
            // Add your form submission logic here
        } else {
            console.log("Form has errors. Please fix them.");
        }
    };

    const handleCancel = () => {
        // Reset form fields
        setProductName("");
        setCategory("");
        setProductType("Single Product");
        setColor("");
        setSKU("");
        setPrice("");
        setImage(null);
        setErrors({
            productName: "",
            category: "",
            price: "",
            image: "",
        });
    };

    return (
        <div className={`flex min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
            {isSidebarVisible && <Sidebar />}
            <div className="flex-1 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 dark:from-gray-700 dark:via-gray-800 dark:to-gray-900">
                <Header
                    onMenuClick={toggleSidebar}
                    onThemeToggle={toggleDarkMode}
                    darkMode={darkMode}
                    notificationCount={0}
                />
                <div className="p-4">
                    <div className="flex items-center text-gray-500 dark:text-gray-300">
                        <h2 className={"text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}"}>Products</h2>
                    </div>
                    <div className={"p-6 bg-background text-gray-500 dark:text-gray-300 rounded-lg shadow-md dark:bg-gray-800 ${darkMode ? 'bg-gray-800' : 'bg-white'}"}>
                        <h2 className={"text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}"}>All Products</h2>
                        <Paper sx={{ p: 4, bgcolor: darkMode ? 'background.paper' : '' }}>
                            <Typography variant="h6" gutterBottom color={darkMode ? 'text.primary' : 'text.primary'}>
                                Add Product
                            </Typography>
                            <Box
                                component="form"
                                noValidate
                                autoComplete="off"
                                onSubmit={handleSubmit}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 3,
                                    color: darkMode ? 'text.primary' : 'text.primary'
                                }}
                            >
                                <TextField
                                    label="Product Name"
                                    value={productName}
                                    onChange={(e) => {
                                        setProductName(e.target.value);
                                        setErrors((prev) => ({ ...prev, productName: "" }));
                                    }}
                                    fullWidth
                                    error={!!errors.productName}
                                    helperText={errors.productName}
                                />
                                <FormControl fullWidth error={!!errors.category}>
                                    <InputLabel>Category</InputLabel>
                                    <Select
                                        value={category}
                                        onChange={(e) => {
                                            setCategory(e.target.value as string);
                                            setErrors((prev) => ({ ...prev, category: "" }));
                                        }}
                                        label="Category"
                                    >
                                        <MenuItem value="Category 01">Computer</MenuItem>
                                        <MenuItem value="Category 02">Mobile Phone</MenuItem>
                                    </Select>
                                    {errors.category && <Typography variant="caption" color="error">{errors.category}</Typography>}
                                </FormControl>
                                <FormControl fullWidth>
                                    <InputLabel>Product Type</InputLabel>
                                    <Select
                                        value={productType}
                                        onChange={(e) => setProductType(e.target.value as string)}
                                        label="Product Type"
                                    >
                                        <MenuItem value="Single Product">Single Product</MenuItem>
                                        <MenuItem value="Variable Product">Variable Product</MenuItem>
                                    </Select>
                                </FormControl>
                                <TextField
                                    label="Variations"
                                    value={Color}
                                    onChange={(e) => setColor(e.target.value)}
                                    fullWidth
                                />
                                <TextField
                                    label="SKU"
                                    value={SKU}
                                    onChange={(e) => setSKU(e.target.value)}
                                    fullWidth
                                />
                                <TextField
                                    label="Price"
                                    value={price}
                                    onChange={(e) => {
                                        setPrice(e.target.value);
                                        setErrors((prev) => ({ ...prev, price: "" }));
                                    }}
                                    fullWidth
                                    error={!!errors.price}
                                    helperText={errors.price}
                                />

                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                    <Typography variant="body1" color={darkMode ? 'text.primary' : 'text.primary'}>Image</Typography>
                                    <Button
                                        variant="contained"
                                        component="label"
                                    >
                                        Upload Image
                                        <input
                                            type="file"
                                            hidden
                                            onChange={handleImageChange}
                                        />
                                    </Button>
                                    {image && (
                                        <Typography variant="body2" color={darkMode ? 'text.primary' : 'text.primary'}>
                                            Selected file: {image.name}
                                        </Typography>
                                    )}
                                    {errors.image && <Typography variant="caption" color="error">{errors.image}</Typography>}
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        startIcon={<SaveIcon />}
                                    >
                                        Add
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        startIcon={<CancelIcon />}
                                        onClick={handleCancel}
                                    >
                                        Cancel
                                    </Button>
                                </Box>
                            </Box>
                        </Paper>
                    </div>
                </div>
            </div>
        </div>
    );
}