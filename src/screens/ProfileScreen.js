import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
// import images
import access from "../../assets/profileIcons/access.png";
import add from "../../assets/profileIcons/add.png";
import arrow from "../../assets/profileIcons/arrow.png";
import edit from "../../assets/profileIcons/edit.png";
import help from "../../assets/profileIcons/help.png";
import info from "../../assets/profileIcons/info.png";
import lang from "../../assets/profileIcons/lang.png";
import locate from "../../assets/profileIcons/location.png";
import notif from "../../assets/profileIcons/notif.png";
import priv from "../../assets/profileIcons/privacy.png";
import profile from "../../assets/profileIcons/profile.jpg";
import setting from "../../assets/profileIcons/setting.png";
import signout from "../../assets/profileIcons/signout.png";

export default function ProfileScreen() {

  const usageItems = [
    { label: "Notification", icon: notif },
    { label: "Setting", icon: setting },
    { label: "Language", icon: lang },
    { label: "Accessibility", icon: access },
    { label: "Location", icon: locate },
  ];

  const supportItems = [
    { label: "Help", icon: help },
    { label: "Privacy", icon: priv },
    { label: "About", icon: info },
  ];

  const loginItems = [
    { label: "Add account", icon: add, textColor: "#343434" },
    { label: "Log out", icon: signout, textColor: "red" },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View>
        <Text style={styles.title}>My Profile</Text>

        <View style={styles.profileRow}>
          <Image source={profile} style={styles.profileImage} />

          <View style={styles.profileInfo}>
            <Text style={styles.name}>Jaden Smith</Text>
            <TouchableOpacity style={styles.editButton}>
              <Image source={edit} style={styles.editImage} />
              <Text style={styles.editText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* How you use BiteWise */}
      <View>
        <Text style={styles.sectionTitle}>How you use BiteWise</Text>

        {usageItems.map((item, index) => (
          <TouchableOpacity key={index} style={styles.listItem}>
            <Image source={item.icon} style={styles.iconImage} />
            <Text style={styles.listText}>{item.label}</Text>
            <Image source={arrow} style={styles.arrowImage} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* More info and support */}
      <View>
        <Text style={styles.sectionTitle}>More info and support</Text>

        {supportItems.map((item, index) => (
          <TouchableOpacity key={index} style={styles.listItem}>
            <Image source={item.icon} style={styles.iconImage} />
            <Text style={styles.listText}>{item.label}</Text>
            <Image source={arrow} style={styles.arrowImage} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Login Section */}
      <View>
        <Text style={styles.sectionTitle}>Login</Text>

        {loginItems.map((item, index) => (
          <TouchableOpacity key={index} style={styles.listItem}>
            <Image source={item.icon} style={styles.iconImage} />
            <Text style={[styles.listText, { color: item.textColor }]}>{item.label}</Text>
            <Image source={arrow} style={styles.arrowImage} />
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ marginBottom: 32 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBFCF6",
    paddingHorizontal: 24,
    paddingTop: 64,
  },

  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#343434",
    marginBottom: 20,
  },

  profileRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
    marginRight: 16,
  },

  profileInfo: {
    flex: 1,
    justifyContent: "flex-start",
  },

  name: {
    fontSize: 24,
    fontWeight: "600",
    color: "#343434",
    marginBottom: 8,
  },

  editButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FD8803",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: "flex-start",
  },

  editText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
  },

  divider: {
    height: 2,
    backgroundColor: "#EFF0EA",
    marginVertical: 24,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#343434",
    marginBottom: 24,
  },

  listItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FCFDF7",
    borderRadius: 100,
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginBottom: 16,
    //shadow
    shadowColor: "#7E7E7E",
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },

  listText: {
    flex: 1,
    fontSize: 16,
    color: "#343434",
    fontWeight: "500",
  },

  iconImage: {
    width: 25,
    height: 25,
    marginRight: 16,
    resizeMode: "contain",
  },

  editImage: {
    width: 20,
    height: 20,
    marginRight: 6,
    resizeMode: "contain",
  },

  arrowImage: {
    width: 14,
    height: 14,
    resizeMode: "contain",
  },

});
