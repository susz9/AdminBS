import axios from "axios";
import React, { useEffect, useState } from "react";
import {
    RiEditLine,
    RiDeleteBin7Line,
    RiPhoneLine,
    RiUserLocationLine,
} from "react-icons/ri";
import {
    MdOutlineAlternateEmail,
    MdOutlineBloodtype,
    MdOutlinePersonOutline,
} from "react-icons/md";
import { StyledButton } from "../components/styles";

//mantine library
import {
    Text,
    Table,
    Modal,
    Button,
    Image,
    Stack,
    Group,
    Container,
} from "@mantine/core";

import { Colors } from "../components/styles";

const { brand, darkLight } = Colors;

const Users = () => {
    const [userData, setUserData] = useState([]);
    const [rowData, setRowData] = useState([]);

    //To show user details
    const [showUserDetails, setShowUserDetails] = useState(false);

    //For Edit Modal
    const [showEdit, setShowEdit] = useState(false);
    const handleShowEdit = () => {
        setShowEdit(true);
    };
    const handleHideEdit = () => {
        setShowEdit(false);
    };

    //For Delete Modal
    const [Delete, setDelete] = useState(false);

    //update user details initial data state
    const [fullName, setFullName] = useState(rowData.fullName);
    const [phone, setPhone] = useState(rowData.phone);
    const [email, setEmail] = useState(rowData.email);
    const [bloodGroup, setBloodGroup] = useState(rowData.bloodGroup);
    const [sex, setSex] = useState(rowData.sex);
    const [address, setAddress] = useState(rowData.address);

    //Id for update record and Delete
    const [id, setId] = useState("");

    const getUsers = () => {
        const url = "http://localhost:3000/user/all";
        axios
            .get(url)
            .then((response) => {
                const result = response.data;
                const { status, message, data } = result;
                if (status !== "SUCCESS") {
                    alert(message, status);
                } else {
                    setUserData(data);
                    console.log(data);
                }
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getUsers();
    }, []);

    //Edit function
    const handleEdit = () => {
        const url = `http://localhost:3000/user/update/${id}`;
        const Credentials = {
            fullName,
            phone,
            email,
            bloodGroup,
            sex,
            address,
        };
        axios
            .put(url, Credentials)
            .then((response) => {
                const result = response.data;
                const { status, message } = result;
                if (status !== "SUCCESS") {
                    alert(message, status);
                } else {
                    alert(message);
                    window.location.reload();
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    //Detele function
    const handleDelete = () => {
        const url = `http://localhost:3000/user/delete/${id}`;
        axios
            .delete(url)
            .then((response) => {
                const result = response;
                const { status, message } = result;

                if (status !== "SUCCESS") {
                    alert(message, status);
                } else {
                    alert("User deleted.");
                    window.location.reload();
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    //render screen
    return (
        <Container size="xl">
            <Table verticalSpacing="sm" striped highlightOnHover>
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Blood Group</th>
                        <th>Sex</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody style={{ textAlign: "left" }}>
                    {userData.map((user) => (
                        <tr key={user._id}>
                            <td>
                                <Image
                                    src={user.avatar}
                                    roundedCircle
                                    fluid
                                    style={{ height: 36, width: 36 }}
                                    onClick={() => {
                                        setShowUserDetails(true);
                                        setRowData(user);
                                    }}
                                />
                            </td>
                            <td>{user.fullName}</td>
                            <td>{user.phone}</td>
                            <td>{user.email}</td>
                            <td>{user.bloodGroup}</td>
                            <td>{user.sex}</td>
                            <td>{user.address}</td>
                            <td>
                                <StyledButton
                                    onClick={() => {
                                        handleShowEdit(
                                            setRowData(user),
                                            setId(user._id)
                                        );
                                    }}
                                >
                                    <RiEditLine size={24} />
                                </StyledButton>
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <StyledButton
                                    onClick={() => {
                                        setShowUserDetails(true);
                                        setRowData(user);
                                        setId(user._id);
                                        setDelete(true);
                                    }}
                                >
                                    <RiDeleteBin7Line size={24} />
                                </StyledButton>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* test modal */}
            <Modal
                opened={showUserDetails}
                onClose={() => {
                    setShowUserDetails(false);
                    setDelete(false);
                }}
                title="User Profile"
                overlayOpacity={0.55}
                overlayBlur={3}
                transition="scale"
                transitionDuration={400}
                transitionTimingFunction="ease"
            >
                <Stack style={{ padding: 30 }}>
                    <Image
                        width={250}
                        style={{
                            width: 260,
                            marginLeft: "auto",
                            marginRight: "auto",
                        }}
                        src={rowData.avatar}
                        alt="With default placeholder"
                        withPlaceholder
                    />
                    <Text
                        component="span"
                        align="center"
                        variant="gradient"
                        gradient={{ from: "indigo", to: "cyan", deg: 45 }}
                        weight={700}
                        style={{ fontSize: 32 }}
                    >
                        {rowData.fullName}
                    </Text>
                    <Group position="center" grow>
                        <Group>
                            <MdOutlineBloodtype size={24} />
                            <Text
                                component="span"
                                align="center"
                                variant="text"
                                weight={500}
                                style={{ fontSize: 28 }}
                            >
                                {rowData.bloodGroup}
                            </Text>
                        </Group>{" "}
                        <Group>
                            <MdOutlinePersonOutline size={24} />
                            <Text
                                component="span"
                                align="center"
                                variant="text"
                                weight={500}
                                style={{ fontSize: 24 }}
                            >
                                {rowData.sex}
                            </Text>
                        </Group>
                    </Group>
                    <Group>
                        <RiPhoneLine size={24} />
                        <Text
                            component="span"
                            variant="text"
                            weight={400}
                            style={{ fontSize: 18 }}
                        >
                            {rowData.phone}
                        </Text>
                    </Group>
                    <Group>
                        <MdOutlineAlternateEmail size={24} />
                        <Text
                            component="span"
                            variant="text"
                            weight={400}
                            style={{ fontSize: 18 }}
                        >
                            {rowData.email}
                        </Text>
                    </Group>

                    <Group>
                        <RiUserLocationLine size={24} />
                        <Text
                            component="span"
                            variant="text"
                            size="xl"
                            weight={400}
                            style={{ fontSize: 18 }}
                        >
                            {rowData.address}
                        </Text>
                    </Group>
                    {Delete && (
                        <Button
                            type="submit"
                            className="btn btn-danger mt-4"
                            onClick={handleDelete}
                        >
                            Delete User
                        </Button>
                    )}
                </Stack>
            </Modal>

            {/* Modal for Edit employee record */}
                <Modal
                    show={showEdit}
                    onHide={handleHideEdit}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Edit User Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <Image
                                src={rowData.avatar}
                                roundedCircle
                                fluid
                                style={{ height: 144, width: 144 }}
                            />
                            <div className="form-group">
                                <label>Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    onChange={(e) =>
                                        setFullName(e.target.value)
                                    }
                                    placeholder="Full Name"
                                    defaultValue={rowData.fullName}
                                />
                            </div>
                            <div className="form-group mt-3">
                                <label>Phone</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="Phone Number"
                                    defaultValue={rowData.phone}
                                />
                            </div>
                            <div className="form-group mt-3">
                                <label>Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email"
                                    defaultValue={rowData.email}
                                />
                            </div>
                            <div className="form-group mt-3">
                                <label>Blood Group</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    onChange={(e) =>
                                        setBloodGroup(e.target.value)
                                    }
                                    placeholder="Blood Group"
                                    defaultValue={rowData.bloodGroup}
                                />
                            </div>
                            <div className="form-group mt-3">
                                <label>Sex</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    onChange={(e) => setSex(e.target.value)}
                                    placeholder="Gender"
                                    defaultValue={rowData.sex}
                                />
                            </div>
                            <div className="form-group mt-3">
                                <label>Address</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder="Address"
                                    defaultValue={rowData.address}
                                />
                            </div>
                            <Button
                                type="submit"
                                className="btn btn-warning mt-4"
                                onClick={handleEdit}
                            >
                                Edit User
                            </Button>
                        </div>
                    </Modal.Body>
                </Modal>
        </Container>
    );
};

export default Users;
