const stripe = require("stripe")(
  "sk_test_51MVDk7SJNwQAwY18OXV6ErQY56nW70WI6Fd9N2B3qY7G23XzI6PF2Tl6ehpqVqlazCikaQq5SgK19y0qFCKXq7zy00WjbeNeo4"
);
const catchAsync = require("../utils/catchAsync");
const Tour = require("../models/tourModel");

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.tourId);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    success_url: `${req.protocol}://localhost:3000/tour/${tour.slug}`,
    cancel_url: `${req.protocol}://localhost:3000/tour/${tour.slug}`,
    customer_email: req.user.email,
    client_reference_id: req.params.tourId,
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: `${tour.name} Tour`,
            description: tour.description,
          },
          unit_amount: tour.price,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
  });

  res.status(200).json({
    status: "success",
    session,
  });
});
