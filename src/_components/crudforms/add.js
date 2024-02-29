import React, { useState, useEffect, useRef } from "react";
import { Button, Group, Stack, Input } from "@mantine/core";

const AddForm = ({ selectedRows, closeModal }) => {

  const title = useRef('')
  const author = useRef('')
  const callnum = useRef('')
  const accnum = useRef(0)
  const edition = useRef('')
  const pubplace = useRef('')
  const publisher = useRef('')

  const create = async () => {
    // TODO: include barcode and copyright data in inputs
    const atts = {
      barcode: 123456,
      title: title.current,
      author: author.current,
      call_num: callnum.current,
      accession_num: accnum.current,
      edition: edition.current,
      publication_place: pubplace.current,
      publisher: publisher.current,
      copyright_date: new Date().toISOString(),
      status: 'available'
    }

    console.log(atts)

    // Integer input validation
    const ints = ['accession_num']
    for (let i = 0; i < ints.length; i++) {
      let input = atts[ints[i]];

      let re = /[^0-9]+/
      console.log(re.test(input))

      if (re.test(input)) {
        // TODO: create toast alerting invalid input
        console.log('invalid input for ' + ints[i])
        console.log(atts[ints[i]])
        return
      }
      else {
        console.log('parsing ' + ints[i] + ' to integer...')
        atts[ints[i]] = parseInt(atts[ints[i]])
      }

      const response = await fetch('/api/db', {
        method: 'POST',
        body: JSON.stringify({
          entity: 'books',
          create: 1,
          data: atts
        })
      })

      closeModal();
    }
  }

  return (
    <>
      <Group grow mb={20}>
        <Input.Wrapper label={<strong>Book Title</strong>}>
          <Input placeholder="Book Title" onChange={(e) => ( title.current = e.target.value )}/>
        </Input.Wrapper>
        <Input.Wrapper label={<strong>Book Author</strong>}>
          <Input placeholder="Book Author" onChange={(e) => ( author.current = e.target.value )}/>
        </Input.Wrapper>
      </Group>
      <Group grow mb={20}>
        <Input.Wrapper label={<strong>Call Number</strong>}>
          <Input placeholder="Call Number" onChange={(e) => ( callnum.current = e.target.value )}/>
        </Input.Wrapper>
        <Input.Wrapper label={<strong>Accession Number</strong>}>
          <Input placeholder="Accession Number" onChange={(e) => ( accnum.current = e.target.value )}/>
        </Input.Wrapper>
        <Input.Wrapper label={<strong>Edition</strong>}>
          <Input placeholder="Edition" onChange={(e) => ( edition.current = e.target.value )}/>
        </Input.Wrapper>
      </Group>
      <Group grow>
        <Input.Wrapper label={<strong>Publication Place</strong>}>
          <Input placeholder="Publication Place" onChange={(e) => ( pubplace.current = e.target.value )}/>
        </Input.Wrapper>
        <Input.Wrapper label={<strong>Publisher</strong>}>
          <Input placeholder="Publisher" onChange={(e) => ( publisher.current = e.target.value )}/>
        </Input.Wrapper>
      </Group>
      <Stack justify="center" grow mt="xl">
        <Button variant="filled" color="rgb(141, 16, 56)" radius="xl" onClick={create}>
          Save
        </Button>
        <Button variant="outline" color="rgb(141, 16, 56)" radius="xl">
          Discard
        </Button>
      </Stack>
    </>
  );
};

export default AddForm;
