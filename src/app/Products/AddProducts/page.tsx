"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import {
    Box,
    TextField,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Typography,
    Paper,
    Divider,
    Chip,
    Avatar,
    InputAdornment
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import SaveIcon from "@mui/icons-material/Save";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ImageIcon from "@mui/icons-material/Image";

export default function AddProduct() {
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const [productName, setProductName] = useState("");
    const [category, setCategory] = useState("");
    const [productType, setProductType] = useState("Single Product");
    const [variations, setVariations] = useState<string[]>([]);
    const [currentVariation, setCurrentVariation] = useState("");
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
            setErrors(prev => ({ ...prev, image: "" }));
        }
    };

    const addVariation = () => {
        if (currentVariation && !variations.includes(currentVariation)) {
            setVariations([...variations, currentVariation]);
            setCurrentVariation("");
        }
    };

    const removeVariation = (index: number) => {
        setVariations(variations.filter((_, i) => i !== index));
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            productName: "",
            category: "",
            price: "",
            image: "",
        };

        if (!productName.trim()) {
            newErrors.productName = "Product Name is required";
            isValid = false;
        }

        if (!category) {
            newErrors.category = "Category is required";
            isValid = false;
        }

        if (!price.trim()) {
            newErrors.price = "Price is required";
            isValid = false;
        } else if (isNaN(Number(price))) {
            newErrors.price = "Price must be a number";
            isValid = false;
        } else if (Number(price) <= 0) {
            newErrors.price = "Price must be greater than 0";
            isValid = false;
        }

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
            // Form submission logic would go here
            console.log({
                productName,
                category,
                productType,
                variations,
                SKU,
                price: Number(price),
                image
            });
            alert("Product added successfully!");
            handleCancel();
        }
    };

    const handleCancel = () => {
        setProductName("");
        setCategory("");
        setProductType("Single Product");
        setVariations([]);
        setCurrentVariation("");
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
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: darkMode ? 'background.default' : 'background.paper' }}>
            {isSidebarVisible && <Sidebar />}
            <Box sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                bgcolor: darkMode ? 'background.default' : 'background.paper'
            }}>
                <Header
                    onMenuClick={toggleSidebar}
                    onThemeToggle={toggleDarkMode}
                    darkMode={darkMode}
                    notificationCount={0}
                />
                <Box sx={{ p: 3, flex: 1 }}>
                    <Typography
                        variant="h4"
                        component="h1"
                        gutterBottom
                        sx={{
                            color: darkMode ? 'text.primary' : 'text.primary',
                            fontWeight: 'bold',
                            mb: 4
                        }}
                    >
                        Add New Product
                    </Typography>

                    <Paper
                        elevation={3}
                        sx={{
                            p: 4,
                            bgcolor: darkMode ? 'background.paper' : 'background.paper',
                            borderRadius: 2
                        }}
                    >
                        <Typography
                            variant="h6"
                            gutterBottom
                            sx={{
                                color: darkMode ? 'text.primary' : 'text.primary',
                                mb: 3,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1
                            }}
                        >
                            Product Information
                        </Typography>

                        <Divider sx={{ mb: 3 }} />

                        <Box
                            component="form"
                            noValidate
                            autoComplete="off"
                            onSubmit={handleSubmit}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 3
                            }}
                        >
                            <Box sx={{ display: 'flex', gap: 3 }}>
                                <TextField
                                    label="Product Name"
                                    value={productName}
                                    onChange={(e) => {
                                        setProductName(e.target.value);
                                        setErrors(prev => ({ ...prev, productName: "" }));
                                    }}
                                    fullWidth
                                    error={!!errors.productName}
                                    helperText={errors.productName}
                                    sx={{ flex: 1 }}
                                />

                                <FormControl fullWidth error={!!errors.category} sx={{ flex: 1 }}>
                                    <InputLabel>Category</InputLabel>
                                    <Select
                                        value={category}
                                        onChange={(e) => {
                                            setCategory(e.target.value as string);
                                            setErrors(prev => ({ ...prev, category: "" }));
                                        }}
                                        label="Category"
                                    >
                                        <MenuItem value="Computer">Computer</MenuItem>
                                        <MenuItem value="Mobile Phone">Mobile Phone</MenuItem>
                                        <MenuItem value="Electronics">Electronics</MenuItem>
                                        <MenuItem value="Accessories">Accessories</MenuItem>
                                        <MenuItem value="Home Appliances">Home Appliances</MenuItem>
                                    </Select>
                                    {errors.category && (
                                        <Typography variant="caption" color="error" sx={{ mt: 1 }}>
                                            {errors.category}
                                        </Typography>
                                    )}
                                </FormControl>
                            </Box>

                            <Box sx={{ display: 'flex', gap: 3 }}>
                                <FormControl fullWidth sx={{ flex: 1 }}>
                                    <InputLabel>Product Type</InputLabel>
                                    <Select
                                        value={productType}
                                        onChange={(e) => setProductType(e.target.value as string)}
                                        label="Product Type"
                                    >
                                        <MenuItem value="Single Product">Single Product</MenuItem>
                                        <MenuItem value="Variable Product">Variable Product</MenuItem>
                                        <MenuItem value="Bundle Product">Bundle Product</MenuItem>
                                    </Select>
                                </FormControl>

                                <TextField
                                    label="SKU"
                                    value={SKU}
                                    onChange={(e) => setSKU(e.target.value)}
                                    fullWidth
                                    sx={{ flex: 1 }}
                                />
                            </Box>

                            {productType === "Variable Product" && (
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                    <Box sx={{ display: 'flex', gap: 2 }}>
                                        <TextField
                                            label="Add Variation"
                                            value={currentVariation}
                                            onChange={(e) => setCurrentVariation(e.target.value)}
                                            fullWidth
                                        />
                                        <Button
                                            variant="outlined"
                                            onClick={addVariation}
                                            disabled={!currentVariation}
                                        >
                                            Add
                                        </Button>
                                    </Box>
                                    {variations.length > 0 && (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                            {variations.map((variation, index) => (
                                                <Chip
                                                    key={index}
                                                    label={variation}
                                                    onDelete={() => removeVariation(index)}
                                                    color="primary"
                                                    variant="outlined"
                                                />
                                            ))}
                                        </Box>
                                    )}
                                </Box>
                            )}

                            <TextField
                                label="Price"
                                value={price}
                                onChange={(e) => {
                                    setPrice(e.target.value);
                                    setErrors(prev => ({ ...prev, price: "" }));
                                }}
                                fullWidth
                                error={!!errors.price}
                                helperText={errors.price}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">$</InputAdornment>
                                    ),
                                }}
                            />

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                    Product Image
                                </Typography>
                                <Button
                                    variant="outlined"
                                    component="label"
                                    startIcon={<CloudUploadIcon />}
                                    sx={{
                                        alignSelf: 'flex-start',
                                        py: 1.5,
                                        px: 3
                                    }}
                                >
                                    Upload Image
                                    <input
                                        type="file"
                                        hidden
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                </Button>
                                {image && (
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
                                        <Avatar variant="rounded" sx={{ bgcolor: 'primary.main' }}>
                                            <ImageIcon />
                                        </Avatar>
                                        <Typography variant="body2">
                                            {image.name}
                                        </Typography>
                                    </Box>
                                )}
                                {errors.image && (
                                    <Typography variant="caption" color="error">
                                        {errors.image}
                                    </Typography>
                                )}
                            </Box>

                            <Divider sx={{ my: 2 }} />

                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                gap: 2,
                                pt: 2
                            }}>
                                <Button
                                    variant="outlined"
                                    startIcon={<CancelIcon />}
                                    onClick={handleCancel}
                                    sx={{ px: 4 }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    startIcon={<SaveIcon />}
                                    sx={{ px: 4 }}
                                >
                                    Save Product
                                </Button>
                            </Box>
                        </Box>
                    </Paper>
                </Box>
            </Box>
        </Box>
    );
}