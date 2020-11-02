import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Button, Input, Row, Space, Table, Tag, Typography } from "antd";
import { getData } from "../api";
import moment from "moment";
import "./main.scss";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function tagColors() {
  const colors = {};
  return function (tag) {
    if (colors[tag]) {
      return colors[tag];
    } else {
      colors[tag] = getRandomColor();
      return colors[tag];
    }
  };
}

function Main(props) {
  const [data, setData] = useState([]);
  const [state, setState] = useState({
    searchText: "",
    searchedColumn: "",
  });

  const getTagColors = tagColors();
  const searchInput = useRef(null);

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            searchInput.current = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current.select(), 100);
      }
    },
    render: (text) =>
      state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setState({ ...state, searchText: "" });
  };

  const columns = [
    {
      title: "Identifier",
      children: [
        {
          title: "ID",
          dataIndex: "id",
          key: "id",
          fixed: "left",
          width: 100,
        },
        {
          title: "GUID",
          dataIndex: "guid",
          key: "guid",
          width: 200,
          ...getColumnSearchProps("guid"),
        },
      ],
    },
    {
      title: "Name",
      // fixed: "left",
      children: [
        {
          title: "First Name",
          dataIndex: "firstName",
          key: "firstName",
          width: 120,
          ...getColumnSearchProps("firstName"),
        },
        {
          title: "Last Name",
          dataIndex: "lastName",
          key: "lastName",
          width: 120,
          ...getColumnSearchProps("lastName"),
        },
      ],
    },

    {
      title: "Personal Information",
      children: [
        {
          title: "Gender",
          dataIndex: "gender",
          key: "gender",
          width: 80,
          render: (gender) => (
            <span>{gender[0].toUpperCase() + gender.slice(1)}</span>
          ),
          filters: [
            {
              text: "Male",
              value: "male",
            },
            {
              text: "Female",
              value: "female",
            },
          ],
          filterMultiple: false,
          onFilter: (value, record) => record.gender.indexOf(value) === 0,
        },
        {
          title: "Age",
          dataIndex: "age",
          key: "age",
          width: 100,
          sorter: (a, b) => a.age - b.age,
        },
        {
          title: "Eye Color",
          dataIndex: "eyeColor",
          key: "eyeColor",
          width: 120,
          render: (color) => (
            <Tag color={`${color}`}>
              {color[0].toUpperCase() + color.slice(1)}
            </Tag>
          ),
          filters: [
            {
              text: "Brown",
              value: "brown",
            },
            {
              text: "Blue",
              value: "blue",
            },
            {
              text: "Green",
              value: "green",
            },
          ],
          filterMultiple: false,
          onFilter: (value, record) => record.eyeColor.indexOf(value) === 0,
        },
      ],
    },
    {
      title: "Contact",
      children: [
        {
          title: "Email",
          dataIndex: "email",
          key: "email",

          width: 300,
          ...getColumnSearchProps("email"),
        },
        {
          title: "Phone",
          dataIndex: "phone",
          key: "phone",
          width: 100,
          ...getColumnSearchProps("phone"),
        },
      ],
    },
    {
      title: "Coordinate",
      children: [
        {
          title: "Longitude",
          dataIndex: "longitude",
          key: "longitude",
          width: 100,
        },
        {
          title: "Latitude",
          dataIndex: "latitude",
          key: "latitude",
          width: 100,
        },
      ],
    },
    {
      title: "Registered at",
      dataIndex: "registered",
      key: "registered",
      width: 200,
      render: (registered) => (
        <span>
          <p>
            {moment(registered.split(" ").join("")).format("DD-MM-YYYY HH:mm")}
          </p>
        </span>
      ),
    },
    {
      title: "About",
      dataIndex: "about",
      key: "about",
      width: 390,
      ...getColumnSearchProps("about"),
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      width: 100,
      render: (isActive) => (
        <Tag color={isActive ? "green" : "volcano"}>
          {isActive ? "Active" : "Inactive"}
        </Tag>
      ),
      filters: [
        {
          text: "Active",
          value: true,
        },
        {
          text: "Inactive",
          value: false,
        },
      ],
      filterMultiple: false,
      onFilter: (value, record) => record.isActive == value,
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      width: 250,
      render: (tags) => (
        <span>
          {tags.map((tag, i) => {
            {
              /* console.log("tag", tag, "i", i); */
            }
            return (
              <Tag color={getTagColors(tag)} key={i}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </span>
      ),
    },

    {
      title: "Balance",
      dataIndex: "balance",
      key: "balance",
      fixed: "right",
      width: 100,
      sorter: (a, b) => a.balance - b.balance,
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getData();
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();

    return () => {};
  }, []);

  return (
    <Row className="data-table">
      {data && (
        <Table
          columns={columns}
          dataSource={data}
          bordered
          size="middle"
          rowKey={(record) => record.id}
          scroll={{ x: "calc(700px + 50%)", y: 650 }}
        />
      )}
    </Row>
  );
}

Main.propTypes = {};

export default Main;

// about: "Culpa qui ex eu adipisicing. Elit nulla eiusmod eiusmod minim minim Lorem mollit aute anim voluptate exercitation in ea. Pariatur est deserunt culpa dolor tempor eiusmod fugiat magna voluptate. Adipisicing proident tempor anim aliquip.
// ↵"
// age: 36
// balance: 3780.96
// email: "nannieandrews@kyaguru.com"
// eyeColor: "brown"
// firstName: "Renee"
// gender: "female"
// guid: "d4083f28-1543-4688-b953-58b39aef09eb"
// id: 0
// isActive: true
// lastName: "Nannie"
// latitude: 88.074418
// longitude: 97.543168
// phone: "+1 (838) 552-2205"
// registered: "2018-11-29T05:24:07 -07:00"
