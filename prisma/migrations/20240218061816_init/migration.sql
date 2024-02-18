-- CreateEnum
CREATE TYPE "RequestType" AS ENUM ('Book', 'Boardgame');

-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('Student', 'Faculty', 'Staff');

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

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

    CONSTRAINT "Boardgames_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Request" (
    "id" SERIAL NOT NULL,
    "date" TEXT NOT NULL,
    "borrow_date" DATE,
    "return_date" DATE,
    "status" TEXT NOT NULL,
    "type" "RequestType" NOT NULL,
    "user_type" "UserType" NOT NULL,

    CONSTRAINT "Request_pkey" PRIMARY KEY ("id")
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
    "department" TEXT NOT NULL,
    "year_level" TEXT NOT NULL,
    "section" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("request_id")
);

-- CreateTable
CREATE TABLE "Faculty" (
    "request_id" INTEGER NOT NULL,
    "employee_num" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "email" TEXT NOT NULL,

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

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- AddForeignKey
ALTER TABLE "BookRequest" ADD CONSTRAINT "BookRequest_request_id_fkey" FOREIGN KEY ("request_id") REFERENCES "Request"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookRequest" ADD CONSTRAINT "BookRequest_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "Books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoardgameRequest" ADD CONSTRAINT "BoardgameRequest_request_id_fkey" FOREIGN KEY ("request_id") REFERENCES "Request"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoardgameRequest" ADD CONSTRAINT "BoardgameRequest_boardgame_id_fkey" FOREIGN KEY ("boardgame_id") REFERENCES "Boardgames"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_request_id_fkey" FOREIGN KEY ("request_id") REFERENCES "Request"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Faculty" ADD CONSTRAINT "Faculty_request_id_fkey" FOREIGN KEY ("request_id") REFERENCES "Request"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Staff" ADD CONSTRAINT "Staff_request_id_fkey" FOREIGN KEY ("request_id") REFERENCES "Request"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
