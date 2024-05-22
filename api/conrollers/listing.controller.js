import { log } from "console";
import Listing from "../models/listing.model.js";
import { errorHandler } from "../utilitis/error.js";

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const deletelisting = async (req, res, next) => {
  const findlist = await Listing.findById(req.params.id);

  //here i am checking if ther is list created with the id comming from front and i will delete only that list
  if (!findlist) {
    return next(errorHandler(404, "Listing not found!"));
  }
  if (/* req.user.id !== */ findlist.userRef) {
    //this  req.user.id  comes from verify token but not working the token
    //here the userRef is id of user stored previosly  when creating the list check on createlist.jsx
    try {
      await Listing.findByIdAndDelete(req.params.id);
      res.status(200).json("Listing has been deleted!");
    } catch (error) {
      next(error);
    }
  }
};

export const getlistbyid = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    return res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

export const updatelisting = async (req, res, next) => {
  /* if ( req.user.id !==  req.params.id) {   this  req.user.id  comes from the verify token
    return next(errorHandler(401, "You can only update your own listings!"));
  } */
  try {
    const findlist = await Listing.findById(req.params.id);
    if (!findlist) {
      return next(errorHandler(404, "Listing not found!"));
    }
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    return res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};
