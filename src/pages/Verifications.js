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
    MdVerified,
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
    Alert,
    Notification,
    Grid,
} from "@mantine/core";

import { Colors } from "../components/styles";

const Verifications = () => {
    const [userData, setUserData] = useState([]);
    const [rowData, setRowData] = useState([]);

    //Id for update record and Delete
    const [id, setId] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    //To show user details
    const [showVerificationDetails, setShowVerificationDetails] =
        useState(false);

    const [showNotification, setShowNotification] = useState(false);

    //For edit edit/update user details initial data state
    const [fullName, setFullName] = useState(rowData.fullName);
    const [dob, setDob] = useState(rowData.dateOfBirth);
    const [sex, setSex] = useState(rowData.sex);
    const [address, setAddress] = useState(rowData.address);
    const [isVerified, setIsVerified] = useState(rowData.isVerified || null);

    const getUsers = () => {
        const url = "http://localhost:3000/verifications";
        axios
            .get(url)
            .then((response) => {
                const result = response.data;
                const { status, message, data } = result;
                if (status !== "SUCCESS") {
                    alert(message, status);
                } else {
                    setUserData(data);
                }
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getUsers();
    }, []);

    //user verification function
    const verifyUser = () => {
        const url = `http://localhost:3000/verifyUser/${id}`;
        axios
            .put(url)
            .then((response) => {
                const { status, message } = response.data;
                console.log(response);
                if (status !== "SUCCESS") {
                    alert(message, status);
                } else {
                    //alert(message);
                    setShowNotification(true);
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
                        <th>Date of Birth</th>
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
                                />
                            </td>
                            <td>{user.fullName}</td>
                            <td>{user.dateOfBirth}</td>
                            <td>{user.sex}</td>
                            <td>{user.address}</td>

                            <td>
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setShowVerificationDetails(true);
                                        setRowData(user);
                                        setId(user._id);
                                        setImageUrl(user.verify.data);
                                    }}
                                >
                                    Review
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {/* user data modal */}
            <Modal
                size="xl"
                opened={showVerificationDetails}
                onClose={() => {
                    setShowVerificationDetails(false);
                }}
                title="User Verification Details"
                overlayOpacity={0.55}
                overlayBlur={3}
                transition="scale"
                transitionDuration={400}
                transitionTimingFunction="ease"
            >
                <Grid>
                    <Grid.Col span={6}>
                        <Image
                            width={250}
                            style={{
                                width: 56,
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
                                    style={{ fontSize: 24 }}
                                >
                                    {rowData.dateOfBirth}
                                </Text>
                            </Group>
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
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <Stack>
                            <Image
                                src={`data:image/jpg;base64,${imageUrl}`}
                                width="400"
                                withPlaceholder
                            />
                            <Button
                                type="submit"
                                className="btn btn-danger mt-4"
                                onClick={() => {
                                    setShowVerificationDetails(false);
                                    verifyUser();
                                }}
                            >
                                Verify User
                            </Button>
                        </Stack>
                    </Grid.Col>
                </Grid>
            </Modal>

            {/* verified notification */}
            <Modal
                title="User Verified"
                opened={showNotification}
                onClose={() => {
                    setShowNotification(false);
                }}
                overlayOpacity={0.55}
                overlayBlur={3}
                transition="scale"
                transitionDuration={400}
                transitionTimingFunction="ease"
            >
                <Group>
                    <MdVerified size={36} color="green" />
                    <Text>{rowData.fullName} is now a registed donor.</Text>
                </Group>
            </Modal>
        </Container>
    );
};

export default Verifications;
