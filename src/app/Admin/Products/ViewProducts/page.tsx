"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import {
    TableHead,
    Modal,
    TextField,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    InputAdornment,
    Typography,
    Divider,
    Chip,
    Avatar,
    Select,
    MenuItem,
    FormControl,
    InputLabel
} from "@mui/material";
import Image from "next/image";
import SearchIcon from "@mui/icons-material/Search";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ImageIcon from "@mui/icons-material/Image";
import {SelectChangeEvent} from "@mui/material/Select";

interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}

interface Product {
    image: string;
    name: string;
    sku: string;
    category: string;
    quantity: number;
    price: string;
}

export default function ViewProducts() {
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [editProduct, setEditProduct] = useState<Product | null>(null);
    const [deleteProduct, setDeleteProduct] = useState<Product | null>(null);
    const [productsState, setProductsState] = useState<Product[]>([
        {
            image: "https://via.placeholder.com/50",
            name: "Laptop 7",
            sku: "Lap001",
            category: "Computer",
            quantity: 78,
            price: "Rs. 70,000",
        },
    ]);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("name");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [darkMode, setDarkMode] = useState(false);
    const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
    const [productName, setProductName] = useState("");
    const [category, setCategory] = useState("");
    const [productType, setProductType] = useState("Single Product");
    const [variations, setVariations] = useState<string[]>([]);
    const [currentVariation, setCurrentVariation] = useState("");
    const [SKU, setSKU] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState<File | null>(null);
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

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleEdit = (product: Product) => {
        setEditProduct(product);
    };

    const handleDelete = (product: Product) => {
        setDeleteProduct(product);
    };

    const handleSave = () => {
        if (editProduct) {
            const updatedProducts = productsState.map((p) =>
                p.sku === editProduct.sku ? editProduct : p
            );
            setProductsState(updatedProducts);
            setEditProduct(null);
        }
    };

    const handleConfirmDelete = () => {
        if (deleteProduct) {
            const updatedProducts = productsState.filter((p) => p.sku !== deleteProduct.sku);
            setProductsState(updatedProducts);
            setDeleteProduct(null);
        }
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
        setPage(0);
    };

    const handleSortChange = (event: SelectChangeEvent<string>) => {
        setSortBy(event.target.value);
    };

    const handleSortOrderChange = (event: SelectChangeEvent<"asc" | "desc">) => {
        setSortOrder(event.target.value as "asc" | "desc");
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
            const newProduct: Product = {
                image: image ? URL.createObjectURL(image) : "https://via.placeholder.com/50",
                name: productName,
                sku: SKU,
                category: category,
                quantity: 0,
                price: `Rs. ${price}`
            };
            setProductsState([...productsState, newProduct]);
            setIsAddProductModalOpen(false);
            setProductName("");
            setCategory("");
            setSKU("");
            setPrice("");
            setImage(null);
            setVariations([]);
            setCurrentVariation("");
        }
    };

    const handleCancel = () => {
        setProductName("");
        setCategory("");
        setSKU("");
        setPrice("");
        setImage(null);
        setVariations([]);
        setCurrentVariation("");
        setErrors({
            productName: "",
            category: "",
            price: "",
            image: "",
        });
        setIsAddProductModalOpen(false);
    };

    const filteredProducts = productsState.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sortedProducts = filteredProducts.sort((a, b) => {
        if (sortBy === "name") {
            return sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
        } else if (sortBy === "price") {
            const priceA = parseFloat(a.price.replace(/[^0-9.-]+/g, ""));
            const priceB = parseFloat(b.price.replace(/[^0-9.-]+/g, ""));
            return sortOrder === "asc" ? priceA - priceB : priceB - priceA;
        } else if (sortBy === "quantity") {
            return sortOrder === "asc" ? a.quantity - b.quantity : b.quantity - a.quantity;
        }
        return 0;
    });

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - sortedProducts.length) : 0;

    const startEntry = page * rowsPerPage + 1;
    const endEntry = Math.min((page + 1) * rowsPerPage, sortedProducts.length);
    const totalEntries = sortedProducts.length;

    return (
        <div className={`flex min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
            {isSidebarVisible && <Sidebar />}
            <div className="flex-1 transition-all">
                <Header
                    onMenuClick={toggleSidebar}
                    onThemeToggle={toggleDarkMode}
                    darkMode={darkMode}
                />
                <div className="p-4">
                    <div className="flex items-center text-gray-500 dark:text-gray-300">
                        <h2 className="text-2xl font-bold mb-4">Products</h2>
                    </div>
                    <div className="p-6 bg-background text-gray-500 dark:text-gray-300 rounded-lg shadow-md dark:bg-gray-800">
                        <h2 className="text-xl font-bold mb-4">All Products</h2>
                        <div className="flex justify-between mb-4">
                            <TextField
                                placeholder="Search products..."
                                variant="outlined"
                                size="small"
                                value={searchQuery}
                                onChange={handleSearch}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <div className="flex gap-4">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    onClick={() => setIsAddProductModalOpen(true)}
                                >
                                    Add Product
                                </Button>
                                <FormControl variant="outlined" size="small">
                                    <InputLabel>Sort By</InputLabel>
                                    <Select
                                        value={sortBy}
                                        onChange={handleSortChange}
                                        label="Sort By"
                                    >
                                        <MenuItem value="name">Name</MenuItem>
                                        <MenuItem value="quantity">Quantity</MenuItem>
                                        <MenuItem value="price">Price</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl variant="outlined" size="small">
                                    <InputLabel>Order</InputLabel>
                                    <Select
                                        value={sortOrder}
                                        onChange={handleSortOrderChange}
                                        label="Order"
                                    >
                                        <MenuItem value="asc">Ascending</MenuItem>
                                        <MenuItem value="desc">Descending</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Image</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>SKU</TableCell>
                                        <TableCell>Category</TableCell>
                                        <TableCell>Quantity</TableCell>
                                        <TableCell>Price</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {(rowsPerPage > 0
                                            ? sortedProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            : sortedProducts
                                    ).map((product, index) => (
                                        <TableRow key={index}>
                                            <TableCell component="th" scope="row">
                                                <Image
                                                    src={product.image}
                                                    alt={product.name}
                                                    width={40}
                                                    height={40}
                                                    className="rounded"
                                                />
                                            </TableCell>
                                            <TableCell>{product.name}</TableCell>
                                            <TableCell>{product.sku}</TableCell>
                                            <TableCell>{product.category}</TableCell>
                                            <TableCell>{product.quantity}</TableCell>
                                            <TableCell>{product.price}</TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    size="small"
                                                    onClick={() => handleEdit(product)}
                                                    sx={{ mr: 1 }}
                                                >
                                                    Update
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    color="error"
                                                    size="small"
                                                    onClick={() => handleDelete(product)}
                                                >
                                                    Delete
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {emptyRows > 0 && (
                                        <TableRow style={{ height: 53 * emptyRows }}>
                                            <TableCell colSpan={7} />
                                        </TableRow>
                                    )}
                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                        <TableCell colSpan={7} sx={{ borderBottom: "none" }}>
                                            <Box component="span" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2 }}>
                                                <Typography variant="body2" color="textSecondary">
                                                    Showing data {startEntry} to {endEntry} of {totalEntries} entries
                                                </Typography>
                                                <TablePagination
                                                    rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                                                    colSpan={7}
                                                    count={sortedProducts.length}
                                                    rowsPerPage={rowsPerPage}
                                                    page={page}
                                                    slotProps={{
                                                        select: {
                                                            inputProps: {
                                                                "aria-label": "rows per page",
                                                            },
                                                            native: true,
                                                        },
                                                    }}
                                                    onPageChange={handleChangePage}
                                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                                    ActionsComponent={TablePaginationActions}
                                                />
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                </TableFooter>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </div>

            {/* Update Modal */}
            <Modal open={!!editProduct} onClose={() => setEditProduct(null)}>
                <Box sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2
                }}>
                    <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
                        Edit Product
                    </Typography>
                    <TextField
                        label="Name"
                        value={editProduct?.name || ""}
                        onChange={(e) => setEditProduct({ ...editProduct!, name: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="SKU"
                        value={editProduct?.sku || ""}
                        onChange={(e) => setEditProduct({ ...editProduct!, sku: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Category"
                        value={editProduct?.category || ""}
                        onChange={(e) => setEditProduct({ ...editProduct!, category: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Quantity"
                        type="number"
                        value={editProduct?.quantity || ""}
                        onChange={(e) => setEditProduct({ ...editProduct!, quantity: parseInt(e.target.value) || 0 })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Price"
                        value={editProduct?.price || ""}
                        onChange={(e) => setEditProduct({ ...editProduct!, price: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<SaveIcon />}
                            onClick={handleSave}
                        >
                            Save
                        </Button>
                        <Button
                            variant="outlined"
                            startIcon={<CancelIcon />}
                            onClick={() => setEditProduct(null)}
                        >
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Modal>

            {/* Delete Confirmation Dialog */}
            <Dialog open={!!deleteProduct} onClose={() => setDeleteProduct(null)}>
                <DialogTitle>Delete Product</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete the product &quot;{deleteProduct?.name}&quot;?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={() => setDeleteProduct(null)}>Cancel</Button>
                    <Button variant="contained" color="error" onClick={handleConfirmDelete}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Add Product Modal */}
            <Modal open={isAddProductModalOpen} onClose={() => setIsAddProductModalOpen(false)}>
                <Box sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 500,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2
                }}>
                    <Typography variant="h6" component="h2" sx={{ mb: 3 }}>
                        Add New Product
                    </Typography>
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
                                    <InputAdornment position="start">Rs.</InputAdornment>
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
                                type="submit"
                                variant="contained"
                                color="primary"
                                startIcon={<SaveIcon />}
                                sx={{ px: 4 }}
                            >
                                Save Product
                            </Button>
                            <Button
                                variant="outlined"
                                startIcon={<CancelIcon />}
                                onClick={handleCancel}
                                sx={{ px: 4 }}
                            >
                                Cancel
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}