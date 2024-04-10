-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "fn" TEXT NOT NULL,
    "mn" TEXT,
    "ln" TEXT,
    "email" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "access" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Books" (
    "id" SERIAL NOT NULL,
    "barcode" INTEGER NOT NULL,
    "call_num" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "accession_num" INTEGER NOT NULL,
    "author" TEXT NOT NULL,
    "edition" TEXT NOT NULL,
    "publication_place" TEXT NOT NULL,
    "publisher" TEXT NOT NULL,
    "copyright_date" DATE NOT NULL,
    "status" TEXT NOT NULL,
    "archive" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Books_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Boardgames" (
    "id" SERIAL NOT NULL,
    "call_num" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "accession_num" INTEGER NOT NULL,
    "publisher" TEXT NOT NULL,
    "copyright_date" DATE NOT NULL,
    "status" TEXT NOT NULL,
    "archive" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Boardgames_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Requests" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3),
    "borrow_date" TIMESTAMP(3),
    "return_date" TIMESTAMP(3),
    "status" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "user_type" TEXT NOT NULL,

    CONSTRAINT "Requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookRequest" (
    "request_id" INTEGER NOT NULL,
    "book_id" INTEGER NOT NULL,

    CONSTRAINT "BookRequest_pkey" PRIMARY KEY ("request_id")
);

-- CreateTable
CREATE TABLE "BoardgameRequest" (
    "request_id" INTEGER NOT NULL,
    "boardgame_id" INTEGER NOT NULL,

    CONSTRAINT "BoardgameRequest_pkey" PRIMARY KEY ("request_id")
);

-- CreateTable
CREATE TABLE "Student" (
    "request_id" INTEGER NOT NULL,
    "student_num" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "year_level" TEXT NOT NULL,
    "section" TEXT NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("request_id")
);

-- CreateTable
CREATE TABLE "Faculty" (
    "request_id" INTEGER NOT NULL,
    "employee_num" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "department" TEXT NOT NULL,

    CONSTRAINT "Faculty_pkey" PRIMARY KEY ("request_id")
);

-- CreateTable
CREATE TABLE "Staff" (
    "request_id" INTEGER NOT NULL,
    "employee_num" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Staff_pkey" PRIMARY KEY ("request_id")
);

-- CreateTable
CREATE TABLE "Changepassword" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "new_pass" TEXT NOT NULL,
    "date_requested" TIMESTAMP(3) NOT NULL,
    "date_approved" TIMESTAMP(3),
    "date_rejected" TIMESTAMP(3),

    CONSTRAINT "Changepassword_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- AddForeignKey
ALTER TABLE "BookRequest" ADD CONSTRAINT "BookRequest_request_id_fkey" FOREIGN KEY ("request_id") REFERENCES "Requests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookRequest" ADD CONSTRAINT "BookRequest_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "Books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoardgameRequest" ADD CONSTRAINT "BoardgameRequest_request_id_fkey" FOREIGN KEY ("request_id") REFERENCES "Requests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoardgameRequest" ADD CONSTRAINT "BoardgameRequest_boardgame_id_fkey" FOREIGN KEY ("boardgame_id") REFERENCES "Boardgames"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_request_id_fkey" FOREIGN KEY ("request_id") REFERENCES "Requests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Faculty" ADD CONSTRAINT "Faculty_request_id_fkey" FOREIGN KEY ("request_id") REFERENCES "Requests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Staff" ADD CONSTRAINT "Staff_request_id_fkey" FOREIGN KEY ("request_id") REFERENCES "Requests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
