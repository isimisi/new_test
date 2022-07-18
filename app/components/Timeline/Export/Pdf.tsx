import React from "react";
import { Document, Page, View, Text } from "@react-pdf/renderer";
import { FlowElement } from "react-flow-renderer";
import Avatar from "react-nice-avatar";

interface Props {
  elements: FlowElement[];
}

export default function Pdf({ elements }: Props) {
  const testPersons = elements[0]?.data?.persons;
  return (
    <Document>
      <Page size="A4" orientation="landscape" style={{ padding: 20 }}>
        <View style={{ width: "100%", height: "100%" }}>
          {/* Loop over elements goes here Invisiable container */}
          <View
            style={{
              alignItems: "center",
              display: "flex",
              justifyContent: "center"
            }}
          >
            {/* Off timeline elemenet with meta info */}
            <View
              style={{
                width: 250,
                marginBottom: 40,
                padding: 5,
                border: 2,
                borderRadius: 8
              }}
            >
              {/* Top  */}
              <View
                style={{
                  margin: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}
              >
                {/* left side of top  */}
                <View />
                {/* right side of top  */}
                <View
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  {/* loop over persons goes here */}

                </View>
              </View>
              {/* make a divider here */}
              {/*  */}
              <Text style={{ margin: 10, fontWeight: "bold" }}>Title</Text>
              <Text
                style={{ marginLeft: 10, fontSize: "0.8rem", marginRight: 10 }}
              >
                description
              </Text>
              {/* documents container */}
              <View
                style={{
                  display: "flex",
                  alignItems: "center",

                  justifyContent: "space-between"
                }}
              >
                {/* email or node icon goes here */}
                {/* loop over documents go here */}
              </View>
              <View
                style={{
                  position: "absolute",
                  bottom: 5,
                  right: 5,
                  display: "flex",
                  alignItems: "center"
                }}
              >
                {/* loop over tags goes here */}
              </View>
            </View>
            {/* timeline elemenet */}
            <View
              style={{
                display: "flex",
                padding: 12,
                flexGrow: 1,
                alignItems: "center",
                alignSelf: "center",
                justifyContent: "center",
                flexDirection: "column",
                backgroundColor: "#ffffff",
                border: 2,
                borderRadius: 8
              }}
            >
              <Text
                style={{
                  color: "#000000",
                  fontSize: 10,
                  fontWeight: "bold",
                  margin: 0
                }}
              >
                28/08-2018, kl. 09:11
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
