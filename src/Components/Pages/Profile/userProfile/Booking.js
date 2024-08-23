import React, { useState, useEffect } from "react";
import "./Profile.css";
import Hook from "../Hook/Hook";
import { useDispatch, useSelector } from 'react-redux';
import { updateInputData } from '../../Redux/counterSlice';
import BookingModal from "./BokingModal/BookingModal";

function Booking() {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state.counter.formData);
    const posts = Array.isArray(selector?.bookingdata) && selector.bookingdata.length > 0 ? selector.bookingdata[0] : [];

    const [name, setName] = useState("");

    useEffect(() => {
        const fetchBooking = async () => {
            try {
                const response = await Hook.getPost();
                dispatch(updateInputData({ formName: 'bookingdata', inputData: response.data }));
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        const fetchPosts = async () => {
            try {
                const response = await Hook.getProfile();
                dispatch(updateInputData({ formName: 'profiledata', inputData: response.data }));
                if (response.data.name) {
                    setName(response.data.name);
                    localStorage.setItem("user_name", response.data.name);
                } else {
                    const fullName = `${response.data.first_name} ${response.data.last_name}`;
                    setName(fullName);
                    localStorage.setItem("user_name", fullName);
                }
                localStorage.setItem("user_email", response.data.email);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchBooking();
        fetchPosts();
    }, [dispatch]);

    // Filter posts to include only completed bookings
    const completedPosts = posts.filter(post => post.service_status === "completed");

    return (
        <>
            <BookingModal bookings={completedPosts} title="History Bookings" favrate={true} rating={true} />
        </>
    );
}

export default Booking;
