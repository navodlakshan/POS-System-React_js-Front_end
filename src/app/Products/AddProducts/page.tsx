"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Box, TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography, Paper } from "@mui/material";

export default function AddProduct() {
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const [productName, setProductName] = useState("");
    const [category, setCategory] = useState("");
    const [productType, setProductType] = useState("Single Product");
    const [Color, setColor] = useState("");
    const [SKU, setSKU] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState<File | null>(null);

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

    return (
        <div className="flex min-h-screen">
            {isSidebarVisible && <Sidebar />}
            <div className="flex-1 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500">
                <Header onMenuClick={toggleSidebar} />
                <div className="p-4">
                    <div className="flex items-center text-gray-500">
                        <h2 className="text-2xl font-bold mb-4">Products</h2>
                    </div>
                    <div className="p-6 bg-background text-gray-500 rounded-lg shadow-md">
                        <h2 className="text-xl font-bold mb-4">All Products</h2>
                        <Paper sx={{ p: 4 }}>
                            <Typography variant="h6" gutterBottom>
                                Add Product
                            </Typography>
                            <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                <TextField
                                    label="Product Name"
                                    value={productName}
                                    onChange={(e) => {
                                        setProductName(e.target.value);
                                        setErrors((prev) => ({ ...prev, productName: "" })); // Clear error on change
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
                                            setErrors((prev) => ({ ...prev, category: "" })); // Clear error on change
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
                                        setErrors((prev) => ({ ...prev, price: "" })); // Clear error on change
                                    }}
                                    fullWidth
                                    error={!!errors.price}
                                    helperText={errors.price}
                                />

                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                    <Typography variant="body1">Image</Typography>
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
                                        <Typography variant="body2">
                                            Selected file: {image.name}
                                        </Typography>
                                    )}
                                    {errors.image && <Typography variant="caption" color="error">{errors.image}</Typography>}
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                                    <Button type="submit" variant="contained" color="primary">
                                        Add
                                    </Button>
                                    <Button variant="outlined" color="secondary">
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