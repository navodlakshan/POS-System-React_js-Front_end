"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Box, TextField, Button, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from "@mui/material";
import { Add, Remove } from "@mui/icons-material"; // Import icons for adding/removing fields

export default function AttributeManagement() {
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const [attributeName, setAttributeName] = useState("");
    const [attributeValues, setAttributeValues] = useState([""]); // Dynamic list of attribute values
    const [attributes, setAttributes] = useState([
        { id: "1", name: "size", value: "small" },
        { id: "2", name: "size", value: "medium" },
    ]);
    const [editingAttribute, setEditingAttribute] = useState<{ id: string; name: string; value: string } | null>(null);

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    // Add a new attribute value field
    const handleAddAttributeValue = () => {
        setAttributeValues([...attributeValues, ""]);
    };

    // Remove an attribute value field
    const handleRemoveAttributeValue = (index: number) => {
        const newValues = [...attributeValues];
        newValues.splice(index, 1); // Remove the value at the specified index
        setAttributeValues(newValues);
    };

    // Handle changes in attribute value fields
    const handleAttributeValueChange = (index: number, value: string) => {
        const newValues = [...attributeValues];
        newValues[index] = value;
        setAttributeValues(newValues);
    };

    // Add or update an attribute
    const handleAddAttribute = () => {
        if (attributeName.trim() !== "" && attributeValues.some((value) => value.trim() !== "")) {
            if (editingAttribute) {
                // Update existing attribute
                const updatedAttributes = attributes.map((attr) =>
                    attr.id === editingAttribute.id ? { ...attr, name: attributeName, value: attributeValues[0] } : attr
                );
                setAttributes(updatedAttributes);
            } else {
                // Add new attributes
                const newAttributes = attributeValues
                    .filter((value) => value.trim() !== "") // Only add non-empty values
                    .map((value, index) => ({
                        id: `${attributes.length + index + 1}`,
                        name: attributeName,
                        value: value,
                    }));
                setAttributes([...attributes, ...newAttributes]);
            }
            setAttributeName("");
            setAttributeValues([""]); // Reset attribute values
            setEditingAttribute(null); // Clear editing state
        }
    };

    // Delete an attribute
    const handleDeleteAttribute = (id: string) => {
        setAttributes(attributes.filter((attribute) => attribute.id !== id));
    };

    // Edit an attribute
    const handleEditAttribute = (attribute: { id: string; name: string; value: string }) => {
        setEditingAttribute(attribute);
        setAttributeName(attribute.name);
        setAttributeValues([attribute.value]); // Populate with the attribute's value
    };

    // Cancel edit mode
    const handleCancelEdit = () => {
        setEditingAttribute(null);
        setAttributeName("");
        setAttributeValues([""]);
    };

    return (
        <div className="flex min-h-screen">
            {isSidebarVisible && <Sidebar />}
            <div className="flex-1 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500">
                <Header onMenuClick={toggleSidebar} />
                <div className="p-4">
                    <div className="flex items-center text-gray-500">
                        <h2 className="text-2xl font-bold mb-4">Attribute Management</h2>
                    </div>
                    <div className="p-6 bg-background text-gray-500 rounded-lg shadow-md">
                        <Paper sx={{ p: 4, mb: 4 }}>
                            <Typography variant="h6" gutterBottom>
                                {editingAttribute ? "Edit Attribute" : "Add Attribute"}
                            </Typography>
                            <Box component="form" noValidate autoComplete="off" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                <TextField
                                    label="Attribute Name"
                                    value={attributeName}
                                    onChange={(e) => setAttributeName(e.target.value)}
                                    fullWidth
                                />
                                {attributeValues.map((value, index) => (
                                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <TextField
                                            label={`Attribute Value ${index + 1}`}
                                            value={value}
                                            onChange={(e) => handleAttributeValueChange(index, e.target.value)}
                                            fullWidth
                                        />
                                        {index > 0 && ( // Show remove button for all fields except the first one
                                            <IconButton onClick={() => handleRemoveAttributeValue(index)} color="error">
                                                <Remove />
                                            </IconButton>
                                        )}
                                    </Box>
                                ))}
                                <Button
                                    variant="outlined"
                                    startIcon={<Add />}
                                    onClick={handleAddAttributeValue}
                                >
                                    Add Attribute Value
                                </Button>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                                    <Button variant="contained" color="primary" onClick={handleAddAttribute}>
                                        {editingAttribute ? "Update" : "Add"}
                                    </Button>
                                    <Button variant="outlined" color="secondary" onClick={handleCancelEdit}>
                                        Cancel
                                    </Button>
                                </Box>
                            </Box>
                        </Paper>

                        <Paper sx={{ p: 4 }}>
                            <Typography variant="h6" gutterBottom>
                                View Attributes
                            </Typography>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Id</TableCell>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Value</TableCell>
                                            <TableCell>Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {attributes.map((attribute) => (
                                            <TableRow key={attribute.id}>
                                                <TableCell>{attribute.id}</TableCell>
                                                <TableCell>{attribute.name}</TableCell>
                                                <TableCell>{attribute.value}</TableCell>
                                                <TableCell>
                                                    <Button variant="contained" color="primary" sx={{ mr: 1 }} onClick={() => handleEditAttribute(attribute)}>
                                                        Update
                                                    </Button>
                                                    <Button variant="contained" color="error" onClick={() => handleDeleteAttribute(attribute.id)}>
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